// quantumusers.js

// Get all users
export const getAllUsers = () => {
  const users = localStorage.getItem("quantumUsers");
  return users ? JSON.parse(users) : [];
};

// Add a new user
export const addUser = (userData) => {
  const users = getAllUsers();
  const newUser = {
    name: userData.name,
    email: userData.email,
    password: userData.password, // plain for now
    balance: 0,
    plans: [],
    withdrawals: [],
    investments: [],
    miningIncome: 0,
    earnings: 0,
    distribution: [],
    joinedAt: new Date().toISOString(),
  };
  users.push(newUser);
  localStorage.setItem("quantumUsers", JSON.stringify(users));
};

// Update a user and sync with current session
export const updateUser = (updatedUser) => {
  const users = getAllUsers().map((u) =>
    u.email === updatedUser.email ? updatedUser : u
  );
  localStorage.setItem("quantumUsers", JSON.stringify(users));
  setActiveUser(updatedUser);
};

// Find a user by email and password (for login)
export const authenticateUser = (email, password) => {
  const users = getAllUsers();
  return users.find((u) => u.email === email && u.password === password);
};

// Find a user by email only
export const getUserByEmail = (email) => {
  return getAllUsers().find((u) => u.email === email);
};

// Save currently logged in user
export const setActiveUser = (user) => {
  localStorage.setItem("quantumUser", JSON.stringify(user));
};

// Get the currently active user
export const getActiveUser = () => {
  const user = localStorage.getItem("quantumUser");
  return user ? JSON.parse(user) : null;
};

// ✅ Calculate daily ROI earnings and avoid duplicates
export const calculateDailyEarnings = () => {
  const users = getAllUsers();
  const today = new Date().toISOString().split("T")[0];

  const updatedUsers = users.map((user) => {
    let earningsToday = 0;
    const updatedPlans = (user.plans || []).map((plan) => {
      if (plan.status === "Active") {
        const start = new Date(plan.startDate);
        const now = new Date();
        const daysSinceStart = Math.floor((now - start) / (1000 * 60 * 60 * 24));
        const totalDays = plan.duration * 7;
        const dailyROI = (plan.invested * plan.roi) / totalDays;

        const hasReceivedToday = (user.distribution || []).some(
          (d) => d.date === today && d.planId === plan.id
        );

        if (!hasReceivedToday && plan.durationCompleted < plan.duration) {
          earningsToday += dailyROI;
          user.distribution = [
            ...(user.distribution || []),
            { planId: plan.id, amount: dailyROI, date: today },
          ];
          plan.durationCompleted = Math.min(plan.duration, plan.durationCompleted + 1);
        }
      }
      return plan;
    });

    return {
      ...user,
      balance: user.balance + earningsToday,
      miningIncome: (user.miningIncome || 0) + earningsToday,
      plans: updatedPlans,
    };
  });

  localStorage.setItem("quantumUsers", JSON.stringify(updatedUsers));

  const active = getActiveUser();
  if (active) {
    const updated = updatedUsers.find((u) => u.email === active.email);
    if (updated) setActiveUser(updated);
  }
};

// ✅ Automatically complete plans past duration and credit returns
export const autoCompleteMiningPlans = () => {
  const users = getAllUsers();
  const now = new Date();

  const updatedUsers = users.map((user) => {
    const updatedPlans = (user.plans || []).map((plan) => {
      if (plan.status === "Active") {
        const start = new Date(plan.startDate);
        const weeksElapsed = Math.floor(
          (now - start) / (1000 * 60 * 60 * 24 * 7)
        );
        const isComplete = weeksElapsed >= plan.duration;

        if (isComplete) {
          const totalReturn = plan.invested + plan.invested * plan.roi;
          user.balance += totalReturn;
          user.earnings = (user.earnings || 0) + totalReturn;
          return { ...plan, durationCompleted: plan.duration, status: "Completed" };
        } else {
          return { ...plan, durationCompleted: weeksElapsed };
        }
      }
      return plan;
    });

    return { ...user, plans: updatedPlans };
  });

  localStorage.setItem("quantumUsers", JSON.stringify(updatedUsers));
};

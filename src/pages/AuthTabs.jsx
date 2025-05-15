import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addUser,
  authenticateUser,
  getUserByEmail,
  setActiveUser
} from "../utils/quantumusers"; // adjust the path to match your project

const AuthTabs = () => {
  const [tab, setTab] = useState("login");
  const [registerStep, setRegisterStep] = useState(1);
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "" });

  const navigate = useNavigate();

  const handleNext = () => {
    if (registerStep < 3) setRegisterStep(registerStep + 1);
  };

  const handlePrev = () => {
    if (registerStep > 1) setRegisterStep(registerStep - 1);
  };

  const handleInput = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const passwordStrength = (password) => {
    let score = 0;
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = document.querySelector("input[name='loginEmail']").value;
    const password = document.querySelector("input[name='loginPassword']").value;
    const user = authenticateUser(email, password);
    if (user) {
      setActiveUser(user);
      navigate("/dashboard");
    } else {
      alert("Invalid email or password.");
    }
  };

 const handleRegister = (e) => {
  e.preventDefault();
  if (getUserByEmail(registerData.email)) {
    alert("Email already in use.");
  } else {
    const newUser = {
      ...registerData,
      balance: 0,
      plans: [],
      withdrawals: [],
      investments: [],
      joinedAt: new Date().toISOString()
    };
    addUser(newUser);
    setActiveUser(newUser);
    navigate("/dashboard");
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-lightBg px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setTab("login")}
            className={`px-4 py-2 font-semibold border-b-2 ${tab === "login" ? "text-darkBlue border-gold" : "text-gray-500 border-transparent"}`}
          >
            Login
          </button>
          <button
            onClick={() => setTab("register")}
            className={`px-4 py-2 font-semibold border-b-2 ml-4 ${tab === "register" ? "text-darkBlue border-gold" : "text-gray-500 border-transparent"}`}
          >
            Register
          </button>
        </div>

        {/* Login Form */}
        {tab === "login" && (
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input name="loginEmail" type="email" className="w-full border px-3 py-2 rounded" placeholder="Enter email" />
            </div>
            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input name="loginPassword" type="password" className="w-full border px-3 py-2 rounded" placeholder="Enter password" />
            </div>
            <button type="submit" className="bg-gold text-darkBlue w-full py-2 rounded font-semibold hover:bg-yellow-500 transition">
              Login
            </button>
          </form>
        )}

        {/* Register Form */}
        {tab === "register" && (
          <form className="space-y-4" onSubmit={handleRegister}>
            {registerStep === 1 && (
              <div>
                <label className="text-sm text-gray-600">Full Name</label>
                <input
                  name="name"
                  type="text"
                  value={registerData.name}
                  onChange={handleInput}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Enter full name"
                />
              </div>
            )}
            {registerStep === 2 && (
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <input
                  name="email"
                  type="email"
                  value={registerData.email}
                  onChange={handleInput}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Enter email"
                />
              </div>
            )}
            {registerStep === 3 && (
              <div>
                <label className="text-sm text-gray-600">Password</label>
                <input
                  name="password"
                  type="password"
                  value={registerData.password}
                  onChange={handleInput}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Create password"
                />
                <div className="h-2 mt-2 bg-gray-200 rounded overflow-hidden">
                  <div
                    className={`h-2 transition-all ${
                      passwordStrength(registerData.password) === 1
                        ? "w-1/4 bg-red-500"
                        : passwordStrength(registerData.password) === 2
                        ? "w-1/2 bg-yellow-500"
                        : passwordStrength(registerData.password) === 3
                        ? "w-3/4 bg-blue-500"
                        : passwordStrength(registerData.password) === 4
                        ? "w-full bg-green-500"
                        : ""
                    }`}
                  ></div>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-2">
              {registerStep > 1 && (
                <button type="button" className="text-sm text-gray-500 hover:underline" onClick={handlePrev}>
                  Back
                </button>
              )}
              {registerStep < 3 ? (
                <button type="button" className="text-sm text-darkBlue hover:underline ml-auto" onClick={handleNext}>
                  Next →
                </button>
              ) : (
                <button type="submit" className="bg-gold text-darkBlue w-full py-2 rounded font-semibold hover:bg-yellow-500 transition">
                  Register
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthTabs;

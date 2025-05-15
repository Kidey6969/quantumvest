import React, { useState, useEffect } from "react";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Simulated fetch from localStorage or API
    const stored = localStorage.getItem("quantumUsers");
    setUsers(stored ? JSON.parse(stored) : []);
  }, []);

  const toggleStatus = (email) => {
    const updated = users.map((user) =>
      user.email === email ? { ...user, status: user.status === "Active" ? "Suspended" : "Active" } : user
    );
    setUsers(updated);
    localStorage.setItem("quantumUsers", JSON.stringify(updated));
  };

  const deleteUser = (email) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;
    const filtered = users.filter((user) => user.email !== email);
    setUsers(filtered);
    localStorage.setItem("quantumUsers", JSON.stringify(filtered));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-darkBlue">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">Email</th>
              <th className="text-left px-4 py-2">Balance</th>
              <th className="text-left px-4 py-2">Active Plans</th>
              <th className="text-left px-4 py-2">Joined</th>
              <th className="text-left px-4 py-2">Status</th>
              <th className="text-left px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.email} className="border-t">
                <td className="px-4 py-2">{u.name}</td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2">${Number(u.balance).toLocaleString()}</td>
                <td className="px-4 py-2">{u.activePlans || 0}</td>
                <td className="px-4 py-2">{u.joinedAt?.split("T")[0]}</td>
                <td className={`px-4 py-2 font-medium ${u.status === "Active" ? "text-green-600" : "text-red-500"}`}>
                  {u.status}
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => toggleStatus(u.email)}
                    className="px-2 py-1 bg-yellow-400 text-white rounded text-sm"
                  >
                    Toggle Status
                  </button>
                  <button
                    onClick={() => deleteUser(u.email)}
                    className="px-2 py-1 bg-red-600 text-white rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;

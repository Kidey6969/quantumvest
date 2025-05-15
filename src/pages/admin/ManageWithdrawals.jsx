import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  updateUser,
  setActiveUser,
} from "../../utils/quantumusers";

const ManageWithdrawals = () => {
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("quantumWithdrawals");
    setWithdrawals(stored ? JSON.parse(stored) : []);
  }, []);

  const updateStatus = (id, status) => {
    const updated = withdrawals.map((w) =>
      w.id === id ? { ...w, status } : w
    );
    setWithdrawals(updated);
    localStorage.setItem("quantumWithdrawals", JSON.stringify(updated));

    const approvedWithdrawal = updated.find(
      (w) => w.id === id && status === "Approved"
    );

    if (approvedWithdrawal) {
      const users = getAllUsers();
      const user = users.find((u) => u.email === approvedWithdrawal.email);
      if (user) {
        user.balance = Math.max(0, user.balance - approvedWithdrawal.amount);
        user.withdrawals = [
          ...(user.withdrawals || []),
          {
            id: approvedWithdrawal.id,
            amount: approvedWithdrawal.amount,
            method: approvedWithdrawal.method,
            date: approvedWithdrawal.date,
            status: "Completed",
          },
        ];
        updateUser(user);      // Save to quantumUsers
        setActiveUser(user);   // Sync if this is the logged-in user
      }
    }
  };

  const statusStyle = (status) => {
    switch (status) {
      case "Approved":
        return "text-green-600 font-semibold";
      case "Rejected":
        return "text-red-600 font-semibold";
      default:
        return "text-yellow-600 font-semibold";
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-darkBlue">Manage Withdrawals</h2>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="px-4 py-2 text-left">User</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Method</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {withdrawals.map((w) => (
              <tr key={w.id} className="border-t text-sm">
                <td className="px-4 py-2">{w.email}</td>
                <td className="px-4 py-2 text-red-700 font-semibold">
                  ${Number(w.amount).toLocaleString()}
                </td>
                <td className="px-4 py-2 capitalize">{w.method}</td>
                <td className={`px-4 py-2 ${statusStyle(w.status)}`}>
                  {w.status}
                </td>
                <td className="px-4 py-2 space-x-2">
                  {w.status === "Pending" ? (
                    <>
                      <button
                        onClick={() => updateStatus(w.id, "Approved")}
                        className="bg-green-600 text-white px-2 py-1 rounded text-xs"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(w.id, "Rejected")}
                        className="bg-red-600 text-white px-2 py-1 rounded text-xs"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-400 text-xs">No actions</span>
                  )}
                </td>
              </tr>
            ))}
            {withdrawals.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No withdrawal requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageWithdrawals;

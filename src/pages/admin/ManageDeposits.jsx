import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  updateUser,
  setActiveUser,
} from "../../utils/quantumusers"; // Adjust path as needed

const ManageDeposits = () => {
  const [deposits, setDeposits] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("quantumDeposits");
    setDeposits(stored ? JSON.parse(stored) : []);
  }, []);

  const updateStatus = (id, status) => {
    const updated = deposits.map((d) =>
      d.id === id ? { ...d, status } : d
    );
    setDeposits(updated);
    localStorage.setItem("quantumDeposits", JSON.stringify(updated));

    const approvedDeposit = updated.find(
      (d) => d.id === id && status === "Approved"
    );

    if (approvedDeposit) {
      const users = getAllUsers();
      const user = users.find((u) => u.email === approvedDeposit.email);

      if (user) {
        user.balance += approvedDeposit.amount;
        user.investments = [
          ...(user.investments || []),
          {
            id: Date.now(),
            method: `Deposit (${approvedDeposit.coin || approvedDeposit.app})`,
            amount: approvedDeposit.amount,
            date: new Date().toISOString(),
          },
        ];

        updateUser(user);      // Update all users
        setActiveUser(user);   // Sync current session if applicable
      }
    }
  };

  const statusColor = (status) => {
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
      <h2 className="text-2xl font-bold mb-6 text-darkBlue">Manage Deposits</h2>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="px-4 py-2 text-left">User</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Method</th>
              <th className="px-4 py-2">Coin/App</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {deposits.map((d) => (
              <tr key={d.id} className="border-t text-sm">
                <td className="px-4 py-2">{d.email}</td>
                <td className="px-4 py-2 text-green-700 font-semibold">
                  ${Number(d.amount).toLocaleString()}
                </td>
                <td className="px-4 py-2 capitalize">{d.method}</td>
                <td className="px-4 py-2">{d.coin || d.app}</td>
                <td className={`px-4 py-2 ${statusColor(d.status)}`}>
                  {d.status}
                </td>
                <td className="px-4 py-2 space-x-2">
                  {d.status === "Pending" ? (
                    <>
                      <button
                        onClick={() => updateStatus(d.id, "Approved")}
                        className="bg-green-600 text-white px-2 py-1 rounded text-xs"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(d.id, "Rejected")}
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
            {deposits.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No deposit records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDeposits;

import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardAnalytics = () => {
  const [users, setUsers] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    const storedUsers = localStorage.getItem("quantumUsers");
    const storedDeposits = localStorage.getItem("quantumDeposits");
    const storedWithdrawals = localStorage.getItem("quantumWithdrawals");

    setUsers(storedUsers ? JSON.parse(storedUsers) : []);
    setDeposits(storedDeposits ? JSON.parse(storedDeposits) : []);
    setWithdrawals(storedWithdrawals ? JSON.parse(storedWithdrawals) : []);
  }, []);

  const totalDeposits = deposits
    .filter((d) => d.status === "Approved")
    .reduce((sum, d) => sum + Number(d.amount || 0), 0);

  const totalWithdrawals = withdrawals
    .filter((w) => w.status === "Approved")
    .reduce((sum, w) => sum + Number(w.amount || 0), 0);

  const pieData = {
    labels: ["Approved Deposits", "Approved Withdrawals"],
    datasets: [
      {
        data: [totalDeposits, totalWithdrawals],
        backgroundColor: ["#10B981", "#EF4444"], // green, red
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-darkBlue">Admin Dashboard Analytics</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow text-center">
          <h2 className="text-2xl font-bold text-gold">{users.length}</h2>
          <p className="text-gray-600">Total Users</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h2 className="text-2xl font-bold text-green-600">${totalDeposits.toLocaleString()}</h2>
          <p className="text-gray-600">Approved Deposits</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h2 className="text-2xl font-bold text-red-600">${totalWithdrawals.toLocaleString()}</h2>
          <p className="text-gray-600">Approved Withdrawals</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold text-darkBlue mb-4">Funds Distribution</h3>
        <div className="max-w-sm mx-auto">
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardAnalytics;

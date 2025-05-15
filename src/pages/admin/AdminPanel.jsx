import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import DashboardAnalytics from "./DashboardAnalytics";
import ManageUsers from "./ManageUsers";
import ManagePlans from "./ManagePlans";
import ManageWithdrawals from "./ManageWithdrawals";
import ManageDeposits from "./ManageDeposits";
import InvestmentLogs from "./InvestmentLogs";
import AdminSettings from "./AdminSettings";
import Messaging from "./Messaging";
import Announcements from "./Announcements";
import AdminMineManager from "./AdminMineManager"; // ✅ Import mining manager

const AdminPanel = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-darkBlue text-white p-6 space-y-4">
        <h1 className="text-2xl font-bold mb-6">Admin</h1>
        <NavLink to="dashboard" className="block">Dashboard</NavLink>
        <NavLink to="users" className="block">Manage Users</NavLink>
        <NavLink to="plans" className="block">Mining Plans</NavLink>
        <NavLink to="withdrawals" className="block">Withdrawals</NavLink>
        <NavLink to="deposits" className="block">Deposits</NavLink>
        <NavLink to="investments" className="block">Investments</NavLink>
        <NavLink to="manage-mining" className="block">Manage Mining</NavLink> {/* ✅ New link */}
        <NavLink to="messaging" className="block">Messaging</NavLink>
        <NavLink to="announcements" className="block">Announcements</NavLink>
        <NavLink to="settings" className="block">Settings</NavLink>
      </aside>

      <main className="flex-1 p-6 bg-lightBg overflow-auto">
        <Routes>
          <Route path="dashboard" element={<DashboardAnalytics />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="plans" element={<ManagePlans />} />
          <Route path="withdrawals" element={<ManageWithdrawals />} />
          <Route path="deposits" element={<ManageDeposits />} />
          <Route path="investments" element={<InvestmentLogs />} />
          <Route path="manage-mining" element={<AdminMineManager />} /> {/* ✅ New route */}
          <Route path="messaging" element={<Messaging />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="settings" element={<AdminSettings />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminPanel;

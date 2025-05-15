import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Withdraw from "./pages/Withdraw";
import Portfolio from "./pages/Portfolio";
import Wallet from "./pages/Wallet";
import Settings from "./pages/Settings";
import Transactions from "./pages/transactions";
import Mine from "./pages/Mine";
import AuthTabs from "./pages/AuthTabs";
import Security from "./pages/Security";

// Admin components
import AdminPanel from "./pages/admin/AdminPanel";
import DashboardAnalytics from "./pages/admin/DashboardAnalytics";
import ManageUsers from "./pages/admin/ManageUsers";
import ManagePlans from "./pages/admin/ManagePlans";
import ManageWithdrawals from "./pages/admin/ManageWithdrawals";
import ManageDeposits from "./pages/admin/ManageDeposits";
import InvestmentLogs from "./pages/admin/InvestmentLogs";
import AdminSettings from "./pages/admin/AdminSettings";
import Messaging from "./pages/admin/Messaging";
import AdminMineManager from "./pages/admin/AdminMineManager";
import Announcements from "./pages/admin/Announcements";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <Routes>
            {/* Public/User Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/security" element={<Security />} />
            <Route path="/mine" element={<Mine />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/auth" element={<AuthTabs />} />
            <Route path="/login" element={<AuthTabs />} />

            {/* Admin Panel with Nested Routes */}
            <Route path="/admin" element={<AdminPanel />}>
              <Route path="dashboard" element={<DashboardAnalytics />} />
              <Route path="users" element={<ManageUsers />} />
              <Route path="plans" element={<ManagePlans />} />
              <Route path="manage-mining" element={<AdminMineManager />} />
              <Route path="withdrawals" element={<ManageWithdrawals />} />
              <Route path="deposits" element={<ManageDeposits />} />
              <Route path="investments" element={<InvestmentLogs />} />
              <Route path="messages" element={<Messaging />} />
              <Route path="announcements" element={<Announcements />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

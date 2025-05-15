import React from "react";
import { Outlet, Link } from "react-router-dom";

const AdminPanel = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-darkBlue text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-4">
          <Link to="/admin/dashboard" className="block hover:text-gold">Dashboard</Link>
          <Link to="/admin/users" className="block hover:text-gold">Manage Users</Link>
          <Link to="/admin/plans" className="block hover:text-gold">Manage Plans</Link>
          <Link to="/admin/withdrawals" className="block hover:text-gold">Withdrawals</Link>
          <Link to="/admin/deposits" className="block hover:text-gold">Deposits</Link>
          <Link to="/admin/investments" className="block hover:text-gold">Investment Logs</Link>
          <Link to="/admin/messages" className="block hover:text-gold">Messaging</Link>
          <Link to="/admin/announcements" className="block hover:text-gold">Announcements</Link>
          <Link to="/admin/settings" className="block hover:text-gold">Settings</Link>
        </nav>
      </aside>
      <main className="flex-1 p-8 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;

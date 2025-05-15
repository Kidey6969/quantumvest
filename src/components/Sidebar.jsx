import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-darkBlue text-white flex flex-col shadow-lg">
      <div className="p-6 text-2xl font-bold border-b border-gold">
        QuantumVest
      </div>
      <nav className="flex-1 p-4 space-y-3">
        <Link to="/" className="block hover:text-gold transition">🏠 Home</Link>
        <Link to="/dashboard" className="block hover:text-gold transition">📊 Dashboard</Link>
        <Link to="/wallet" className="block hover:text-gold transition">👛 Wallet</Link>
        <Link to="/portfolio" className="block hover:text-gold transition">💰 Portfolio</Link>
        <Link to="/mine" className="block hover:text-gold transition">⚡ Mine</Link>
        <Link to="/transactions" className="block hover:text-gold transition">📈 Transactions</Link>
        <Link to="/withdraw" className="block hover:text-gold transition">💸 Withdraw</Link>
        <Link to="/settings" className="block hover:text-gold transition">⚙️ Settings</Link>
        <Link to="/security" className="block hover:text-gold transition">🔒 Security</Link>
      </nav>
    </aside>
  );
};
<button
  onClick={() => {
    localStorage.removeItem("quantumUser");
    window.location.href = "/auth";
  }}
  className="text-red-500 hover:underline text-sm"
>
  Logout
</button>

export default Sidebar;

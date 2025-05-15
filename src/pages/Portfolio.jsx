import React, { useEffect, useState } from "react";
import { getActiveUser } from "../utils/quantumusers"; // adjust path if needed

const Portfolio = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getActiveUser();
    setUser(currentUser);
  }, []);

  const earnings = user?.earnings ? `$${Number(user.earnings).toLocaleString()}` : "$0.00";
  const distribution = user?.distribution || [
    { coin: "Bitcoin", amount: "0 BTC", percent: 0 },
    { coin: "Ethereum", amount: "0 ETH", percent: 0 },
    { coin: "Litecoin", amount: "0 LTC", percent: 0 },
  ];
  const activePlans = user?.plans?.filter(p => p.active) || [];

  return (
    <div className="text-darkBlue space-y-8">
      <h1 className="text-3xl font-bold">Mining Portfolio</h1>

      {/* Total Earnings */}
      <section className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold">Total Earnings</h2>
        <p className="text-2xl font-bold text-gold mt-2">{earnings}</p>
      </section>

      {/* Coin Distribution */}
      <section className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Earnings by Coin</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {distribution.map((coin, index) => (
            <div key={index} className="border p-4 rounded text-center">
              <h3 className="font-semibold text-lg">{coin.coin}</h3>
              <p className="text-gold font-bold">{coin.amount}</p>
              <p className="text-sm text-gray-500">{coin.percent}% of earnings</p>
            </div>
          ))}
        </div>
      </section>

      {/* Active Mining Packages */}
      <section className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Active Mining Packages</h2>
        <div className="space-y-4">
          {activePlans.length > 0 ? activePlans.map(plan => (
            <div key={plan.id} className="p-4 border rounded flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{plan.coin}</h3>
                <p className="text-sm text-gray-500">ROI: {plan.roi} | Duration: {plan.duration}</p>
              </div>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm font-medium">Active</span>
            </div>
          )) : <p className="text-gray-500">No active plans found.</p>}
        </div>
      </section>

      {/* ROI Graph Placeholder */}
      <section className="bg-white p-6 rounded shadow text-center">
        <h2 className="text-xl font-semibold mb-2">Historical ROI</h2>
        <div className="bg-lightBg border p-4 rounded">[ROI Graph Coming Soon]</div>
      </section>
    </div>
  );
};

export default Portfolio;

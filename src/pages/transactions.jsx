import React, { useEffect, useState } from "react";

const Transactions = () => {
  const [deposits, setDeposits] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    const d = localStorage.getItem("quantumDeposits");
    const w = localStorage.getItem("quantumWithdrawals");
    setDeposits(d ? JSON.parse(d) : []);
    setWithdrawals(w ? JSON.parse(w) : []);
  }, []);

  return (
    <div className="text-darkBlue space-y-10">
      <h1 className="text-3xl font-bold">Transaction History</h1>

      <section className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Deposits</h2>
        {deposits.length === 0 ? (
          <p className="text-gray-500">No deposits yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-2 px-3">Date</th>
                <th className="text-left py-2 px-3">Method</th>
                <th className="text-left py-2 px-3">Coin/App</th>
                <th className="text-left py-2 px-3">Amount</th>
                <th className="text-left py-2 px-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {deposits.map((d) => (
                <tr key={d.id} className="border-t">
                  <td className="py-2 px-3">{new Date(d.date).toLocaleDateString()}</td>
                  <td className="py-2 px-3 capitalize">{d.method}</td>
                  <td className="py-2 px-3">{d.coin || d.app}</td>
                  <td className="py-2 px-3">${Number(d.amount).toLocaleString()}</td>
                  <td className="py-2 px-3">{d.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Withdrawals</h2>
        {withdrawals.length === 0 ? (
          <p className="text-gray-500">No withdrawals yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-2 px-3">Date</th>
                <th className="text-left py-2 px-3">Method</th>
                <th className="text-left py-2 px-3">Amount</th>
                <th className="text-left py-2 px-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((w) => (
                <tr key={w.id} className="border-t">
                  <td className="py-2 px-3">{new Date(w.date).toLocaleDateString()}</td>
                  <td className="py-2 px-3">{w.method}</td>
                  <td className="py-2 px-3">${Number(w.amount).toLocaleString()}</td>
                  <td className="py-2 px-3">{w.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default Transactions;

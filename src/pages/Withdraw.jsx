import React from "react";

const Withdraw = () => {
  return (
    <div className="text-darkBlue max-w-xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Withdraw Funds</h1>

      {/* Method Selection */}
      <div>
        <label className="block mb-1">Withdraw Method</label>
        <select className="w-full border px-4 py-2 rounded">
          <option>Bitcoin</option>
          <option>Bank Transfer</option>
          <option>Ethereum</option>
        </select>
      </div>

      {/* Wallet Address */}
      <div>
        <label className="block mb-1">Wallet Address</label>
        <div className="flex gap-2">
          <input type="text" value="bc1qexampleaddress123" readOnly className="flex-1 border px-4 py-2 rounded" />
          <button
            onClick={() => navigator.clipboard.writeText("bc1qexampleaddress123")}
            className="bg-gold text-darkBlue px-4 py-2 rounded"
          >
            Copy
          </button>
        </div>
      </div>

      {/* Confirmation */}
      <div className="text-right">
        <button className="bg-darkBlue text-white px-6 py-2 rounded hover:bg-opacity-90">
          Confirm Withdraw
        </button>
      </div>
    </div>
  );
};

export default Withdraw;

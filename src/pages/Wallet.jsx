import React, { useState } from "react";

const walletOptions = [
  { name: "MetaMask", icon: "https://cryptologos.cc/logos/metamask-icon.svg?v=025" },
  { name: "Trust Wallet", icon: "https://cryptologos.cc/logos/trust-wallet-trust-logo.svg?v=025" },
  { name: "Coinbase Wallet", icon: "https://cryptologos.cc/logos/coinbase-coinbase-logo.svg?v=025" },
  { name: "WalletConnect", icon: "https://cryptologos.cc/logos/walletconnect-walletconnect-logo.svg?v=025" },
  { name: "Exodus", icon: "https://cryptologos.cc/logos/exodus-exodus-logo.svg?v=025" },
];

const Wallet = () => {
  const [selectedWallet, setSelectedWallet] = useState("");
  const [seedWords, setSeedWords] = useState(Array(12).fill(""));
  const [status, setStatus] = useState(null);

  const handleWordChange = (index, value) => {
    const newWords = [...seedWords];
    newWords[index] = value.trim().toLowerCase();
    setSeedWords(newWords);
  };

  const handleConnect = () => {
    const isComplete = seedWords.every((word) => word.length > 0);
    if (selectedWallet && isComplete) {
      setStatus({ type: "success", message: `${selectedWallet} connected successfully!` });
    } else {
      setStatus({ type: "error", message: "Please enter all 12 seed words and select a wallet provider." });
    }
  };

  return (
    <div className="text-darkBlue space-y-8">
      <h1 className="text-3xl font-bold">Connect Wallet</h1>

      {/* Wallet Selection */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {walletOptions.map((wallet) => (
          <button
            key={wallet.name}
            onClick={() => setSelectedWallet(wallet.name)}
            className={`flex flex-col items-center p-4 border rounded-lg shadow hover:shadow-lg transition ${
              selectedWallet === wallet.name ? "ring-2 ring-gold" : ""
            }`}
          >
            <img src={wallet.icon} alt={wallet.name} className="w-12 h-12 mb-2" />
            <span className="text-sm font-medium">{wallet.name}</span>
          </button>
        ))}
      </div>

      {/* Seed Phrase Inputs */}
      <div>
        <label className="block mb-2 font-medium">Enter 12-word Seed Phrase:</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {seedWords.map((word, index) => (
            <input
              key={index}
              type="text"
              autoComplete="off"
              spellCheck="false"
              className="border px-2 py-1 rounded text-sm"
              placeholder={`Word ${index + 1}`}
              value={word}
              onChange={(e) => handleWordChange(index, e.target.value)}
            />
          ))}
        </div>
      </div>

      {/* Status Message */}
      {status && (
        <div
          className={`p-4 rounded text-sm ${
            status.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
          }`}
        >
          {status.message}
        </div>
      )}

      {/* Connect Button */}
      <button
        onClick={handleConnect}
        className="bg-gold text-darkBlue px-6 py-2 rounded hover:opacity-90 mt-4"
      >
        Connect Wallet
      </button>
    </div>
  );
};

export default Wallet;

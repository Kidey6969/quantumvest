import React, { useEffect, useState } from "react";
import { getActiveUser, updateUser } from "../utils/quantumusers";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const coins = [
  { name: "Bitcoin", symbol: "BTC", icon: "₿" },
  { name: "Ethereum", symbol: "ETH", icon: "Ξ" },
  { name: "Tether", symbol: "USDT", icon: "₮" }
];

const calculateROI = (amount, duration) => ((amount * 0.02) * (duration / 3)).toFixed(2);
const calculateHashRate = (amount, duration) => ((amount / 100) * (duration / 3)).toFixed(2) + " TH/s";

const Mine = () => {
  const [user, setUser] = useState(null);
  const [selectedPlans, setSelectedPlans] = useState({});
  const [notice, setNotice] = useState(null);
  const [activeTab, setActiveTab] = useState("BTC");

  useEffect(() => {
    const u = getActiveUser();
    if (u) {
      setUser(u);
      const defaultPlans = {};
      coins.forEach((coin) => {
        defaultPlans[coin.symbol] = { duration: 3, amount: 500 };
      });
      setSelectedPlans(defaultPlans);
    }
  }, []);

  const handleDurationChange = (coin, value) => {
    setSelectedPlans((prev) => ({
      ...prev,
      [coin]: { ...prev[coin], duration: value }
    }));
    setNotice(null);
  };

  const handleAmountChange = (coin, value) => {
    const amount = Math.min(parseInt(value) || 0, user.balance);
    setSelectedPlans((prev) => ({
      ...prev,
      [coin]: { ...prev[coin], amount }
    }));
    setNotice(null);
  };

  const handleActivate = (coin) => {
    const plan = selectedPlans[coin];
    const invested = plan.amount;
    const roi = parseFloat(calculateROI(invested, plan.duration));
    const hashRate = calculateHashRate(invested, plan.duration);

    if (user.balance < invested) {
      setNotice({
        type: "error",
        message: `Insufficient balance. You need $${(invested - user.balance).toLocaleString()} more.`
      });
      return;
    }

    if (invested < 100) {
      setNotice({
        type: "error",
        message: "Minimum investment is $100"
      });
      return;
    }

    const newPlan = {
      id: Date.now(),
      coin,
      duration: plan.duration,
      roi,
      hashRate,
      invested,
      durationCompleted: 0,
      status: "Active",
      startDate: new Date().toISOString()
    };

    const updatedUser = {
      ...user,
      balance: user.balance - invested,
      plans: [...(user.plans || []), newPlan],
      investments: [
        ...(user.investments || []),
        {
          id: Date.now(),
          method: `${coin} Mining Plan`,
          amount: invested,
          date: new Date().toISOString()
        }
      ]
    };

    updateUser(updatedUser);

    // ✅ Sync updated user from localStorage
    const syncedUser = JSON.parse(localStorage.getItem("quantumUser"));
    setUser(syncedUser);

    setNotice({
      type: "success",
      message: `Plan activated! $${invested.toLocaleString()} invested for ${plan.duration} weeks. Projected return: $${(invested + (invested * roi)).toLocaleString()}`
    });
  };

  if (!user) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-900 to-darkBlue text-white">
          <h1 className="text-3xl font-bold">Cryptocurrency Mining</h1>
          <p className="mt-2 opacity-90">Invest in mining plans and earn passive income</p>
          <div className="mt-4 p-4 bg-white bg-opacity-10 rounded-lg">
            <p className="text-sm opacity-80">Available Balance</p>
            <p className="text-2xl font-bold">${user.balance.toLocaleString()}</p>
          </div>
        </div>

        <div className="p-6">
          <div className="flex border-b border-gray-200">
            {coins.map((coin) => (
              <button
                key={coin.symbol}
                className={`px-4 py-2 font-medium ${activeTab === coin.symbol ? "text-gold border-b-2 border-gold" : "text-gray-500"}`}
                onClick={() => setActiveTab(coin.symbol)}
              >
                <span className="mr-2">{coin.icon}</span>
                {coin.name}
              </button>
            ))}
          </div>

          {coins.map((coin) => {
            if (activeTab !== coin.symbol) return null;
            
            const plan = selectedPlans[coin.symbol] || { duration: 3, amount: 500 };
            const roi = calculateROI(plan.amount, plan.duration);
            const hashRate = calculateHashRate(plan.amount, plan.duration);
            const projectedReturn = plan.amount + (plan.amount * parseFloat(roi));

            return (
              <div key={coin.symbol} className="mt-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Amount: ${plan.amount}
                    </label>
                    <div className="flex items-center">
                      <span className="mr-2 text-gray-500">$</span>
                      <input
                        type="number"
                        min="100"
                        max={user.balance}
                        value={plan.amount}
                        onChange={(e) => handleAmountChange(coin.symbol, e.target.value)}
                        className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
                      />
                      <button 
                        className="bg-gray-200 px-3 py-2 rounded-r-md"
                        onClick={() => handleAmountChange(coin.symbol, user.balance)}
                      >
                        Max
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Minimum: $100 | Maximum: ${user.balance.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration: {plan.duration} weeks
                    </label>
                    <Slider
                      min={3}
                      max={24}
                      step={1}
                      value={plan.duration}
                      onChange={(value) => handleDurationChange(coin.symbol, value)}
                      trackStyle={{ backgroundColor: '#D1A054', height: 6 }}
                      handleStyle={{
                        borderColor: '#D1A054',
                        height: 20,
                        width: 20,
                        backgroundColor: '#fff',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }}
                      railStyle={{ backgroundColor: '#E5E7EB', height: 6 }}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>3 weeks</span>
                      <span>6 months</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">Plan Summary</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Coin</p>
                      <p className="font-medium">{coin.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Hash Rate</p>
                      <p className="font-medium">{hashRate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Projected ROI</p>
                      <p className="font-medium">{roi}x</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Projected Return</p>
                      <p className="font-medium">${projectedReturn.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <button
                  className="w-full bg-gold hover:bg-gold-dark text-darkBlue font-bold py-3 px-4 rounded-md transition duration-200"
                  onClick={() => handleActivate(coin.symbol)}
                >
                  Activate Mining Plan
                </button>

                {notice && (
                  <div className={`mt-4 p-4 rounded-lg text-sm ${
                    notice.type === "success" 
                      ? "bg-green-100 text-green-800 border border-green-200" 
                      : "bg-red-100 text-red-800 border border-red-200"
                  }`}>
                    {notice.message}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Mine;

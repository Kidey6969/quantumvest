import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { calculateDailyEarnings, getActiveUser, getUserByEmail, setActiveUser } from "../utils/quantumusers";
import { FiLogOut, FiDollarSign, FiTrendingUp, FiHardDrive, FiLink, FiClock, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("plans");
  const [isLoading, setIsLoading] = useState(true);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  useEffect(() => {
    const currentUser = getActiveUser();
    if (!currentUser) {
      navigate("/login");
    } else {
        calculateDailyEarnings(); 
      const refreshed = getUserByEmail(currentUser.email);
      setUser(refreshed);
      setActiveUser(refreshed);
      setIsLoading(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("quantumUser");
    navigate("/login");
  };

  const handleDepositSuccess = () => {
    setShowDepositModal(false);
    const updatedUser = getActiveUser();
    setUser(updatedUser);
  };

  const handleWithdrawSuccess = () => {
    setShowWithdrawModal(false);
    const updatedUser = getActiveUser();
    setUser(updatedUser);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Welcome back, {user.name}</h1>
              <p className="text-blue-100 mt-1 text-sm">
                Last login: {new Date(user.lastLogin || Date.now()).toLocaleString()}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md transition-colors backdrop-blur-sm"
            >
              <FiLogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-10">
        {/* Quick Actions */}
        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setShowDepositModal(true)}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-3 rounded-lg shadow hover:shadow-md transition-all flex items-center justify-center gap-2"
          >
            <FiDollarSign className="h-5 w-5" />
            Deposit Funds
          </button>
          <button 
            onClick={() => setShowWithdrawModal(true)}
            className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 px-4 py-3 rounded-lg shadow hover:shadow-md transition-all flex items-center justify-center gap-2"
          >
            <FiTrendingUp className="h-5 w-5" />
            Withdraw Earnings
          </button>
        </div>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Current Balance" 
            value={user.balance} 
            icon={<FiDollarSign className="h-6 w-6" />}
            color="bg-blue-100 text-blue-600"
          />
          <StatCard 
            title="Total Invested" 
            value={user.investments?.reduce((sum, tx) => sum + (tx.amount || 0), 0)}
            icon={<FiTrendingUp className="h-6 w-6" />}
            color="bg-green-100 text-green-600"
          />
          <StatCard 
            title="Mining Earnings" 
            value={user.miningIncome || 0} 
            icon={<FiHardDrive className="h-6 w-6" />}
            color="bg-yellow-100 text-yellow-600"
          />
          <StatCard 
            title="Active Plans" 
            value={user.plans?.length || 0} 
            icon={<FiLink className="h-6 w-6" />}
            color="bg-purple-100 text-purple-600"
            isCount={true}
          />
        </section>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <nav className="flex overflow-x-auto">
            <TabButton 
              active={activeTab === "plans"} 
              onClick={() => setActiveTab("plans")}
              icon={<FiHardDrive className="h-5 w-5" />}
              label="Mining Plans"
            />
            <TabButton 
              active={activeTab === "withdrawals"} 
              onClick={() => setActiveTab("withdrawals")}
              icon={<FiTrendingUp className="h-5 w-5" />}
              label="Withdrawals"
            />
            <TabButton 
              active={activeTab === "investments"} 
              onClick={() => setActiveTab("investments")}
              icon={<FiDollarSign className="h-5 w-5" />}
              label="Investments"
            />
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {activeTab === "plans" && (
            <TabContent title="Your Mining Plans">
              {user.plans?.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {user.plans.map((plan, index) => (
                    <PlanCard key={index} plan={plan} />
                  ))}
                </div>
              ) : (
                <EmptyState 
                  message="No active mining plans yet"
                  actionText="Start Mining"
                  onAction={() => navigate("/mine")}
                />
              )}
            </TabContent>
          )}

          {activeTab === "withdrawals" && (
            <TabContent title="Withdrawal History">
              {user.withdrawals?.length ? (
                <div className="divide-y divide-gray-100">
                  {user.withdrawals.map((w, i) => (
                    <TransactionItem 
                      key={i}
                      type="withdrawal"
                      amount={w.amount}
                      date={w.date}
                      status={w.status}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState 
                  message="No withdrawal requests yet"
                  actionText="Request Withdrawal"
                  onAction={() => setShowWithdrawModal(true)}
                />
              )}
            </TabContent>
          )}

          {activeTab === "investments" && (
            <TabContent title="Investment History">
              {user.investments?.length ? (
                <div className="divide-y divide-gray-100">
                  {user.investments.map((inv, i) => (
                    <TransactionItem 
                      key={i}
                      type="investment"
                      amount={inv.amount}
                      date={inv.date}
                      method={inv.method}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState 
                  message="No investments recorded"
                  actionText="Make Investment"
                  onAction={() => setShowDepositModal(true)}
                />
              )}
            </TabContent>
          )}
        </div>
      </main>

      {/* Market Data Section */}
      <section className="bg-white py-8 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold mb-4 px-2">Live Market Data</h2>
          <div className="h-[500px] rounded-lg overflow-hidden border border-gray-200">
            <iframe
              src="https://s.tradingview.com/embed-widget/market-overview/?locale=en#%7B%22tabs%22%3A%5B%7B%22title%22%3A%22Crypto%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22BINANCE%3ABTCUSDT%22%2C%22d%22%3A%22BTC%2FUSDT%22%7D%2C%7B%22s%22%3A%22BINANCE%3AETHUSDT%22%2C%22d%22%3A%22ETH%2FUSDT%22%7D%2C%7B%22s%22%3A%22BINANCE%3ASOLUSDT%22%2C%22d%22%3A%22SOL%2FUSDT%22%7D%5D%7D%5D%2C%22colorTheme%22%3A%22light%22%2C%22isTransparent%22%3Afalse%2C%22width%22%3A%22100%25%22%2C%22height%22%3A%22100%25%22%7D"
              width="100%"
              height="100%"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
              title="Crypto Market Data"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Modals */}
      {showDepositModal && (
        <DepositModal onClose={() => setShowDepositModal(false)} onSubmit={handleDepositSuccess} />
      )}
      {showWithdrawModal && (
        <WithdrawModal onClose={() => setShowWithdrawModal(false)} onSubmit={handleWithdrawSuccess} />
      )}
    </div>
  );
};

// Reusable Components
const StatCard = ({ title, value, icon, color, isCount = false }) => (
  <div className={`${color} p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold mt-1">
          {isCount ? value : formatCurrency(value)}
        </p>
      </div>
      <div className={`p-3 rounded-full ${color.replace('text', 'bg').replace('600', '500/20')}`}>
        {icon}
      </div>
    </div>
  </div>
);

const TabButton = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`${active ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'} flex-1 py-4 px-1 font-medium text-sm flex items-center justify-center gap-2 min-w-[120px]`}
  >
    {icon}
    {label}
  </button>
);

const TabContent = ({ title, children }) => (
  <div>
    <div className="px-6 py-4 border-b border-gray-100">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);

const PlanCard = ({ plan }) => {
  const progress = Math.min(100, (plan.durationCompleted / plan.duration) * 100);
  
  return (
    <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-lg text-gray-900">{plan.coin}</h3>
          <p className="text-sm text-gray-500">{plan.hashRate}</p>
        </div>
        <span className={`px-2.5 py-1 text-xs rounded-full font-medium ${
          plan.status === 'Active' ? 'bg-green-100 text-green-800' : 
          plan.status === 'Completed' ? 'bg-blue-100 text-blue-800' : 
          'bg-gray-100 text-gray-800'
        }`}>
          {plan.status}
        </span>
      </div>
      
      <div className="space-y-3 text-sm">
        <div>
          <div className="flex justify-between text-gray-600 mb-1">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                progress < 30 ? 'bg-red-500' : 
                progress < 70 ? 'bg-yellow-500' : 
                'bg-green-500'
              }`} 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-gray-500">Duration</p>
            <p className="font-medium">{plan.duration} weeks</p>
          </div>
          <div>
            <p className="text-gray-500">ROI</p>
            <p className="font-medium">{plan.roi}x</p>
          </div>
          <div>
            <p className="text-gray-500">Invested</p>
            <p className="font-medium">{formatCurrency(plan.invested)}</p>
          </div>
          <div>
            <p className="text-gray-500">Projected</p>
            <p className="font-medium">{formatCurrency(plan.invested * plan.roi)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TransactionItem = ({ type, amount, date, status, method }) => (
  <div className="py-3 flex justify-between items-center hover:bg-gray-50 px-2 rounded">
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-full ${
        type === 'withdrawal' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
      }`}>
        {type === 'withdrawal' ? (
          <FiTrendingUp className="h-5 w-5" />
        ) : (
          <FiDollarSign className="h-5 w-5" />
        )}
      </div>
      <div>
        <p className="font-medium text-gray-900">
          {type === 'withdrawal' ? 'Withdrawal' : 'Investment'} • {formatCurrency(amount)}
        </p>
        <p className="text-sm text-gray-500 flex items-center gap-1">
          <FiClock className="h-3 w-3" />
          {new Date(date).toLocaleDateString()}
          {method && ` • ${method}`}
        </p>
      </div>
    </div>
    {status && (
      <span className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
        status === 'Completed' ? 'bg-green-100 text-green-800' :
        status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
        'bg-red-100 text-red-800'
      }`}>
        {status === 'Completed' ? (
          <FiCheckCircle className="h-3 w-3" />
        ) : (
          <FiAlertCircle className="h-3 w-3" />
        )}
        {status}
      </span>
    )}
  </div>
);

const EmptyState = ({ message, actionText, onAction }) => (
  <div className="text-center py-12">
    <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
      <svg
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">{message}</h3>
    <button
      onClick={onAction}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      {actionText}
    </button>
  </div>
);

// Modals
const DepositModal = ({ onClose, onSubmit }) => {
  const [method, setMethod] = useState("crypto");
  const [option, setOption] = useState("");
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!option || !amount) return;
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const deposit = {
      id: Date.now(),
      method,
      coin: method === "crypto" ? option : undefined,
      app: method === "fiat" ? option : undefined,
      amount: parseFloat(amount),
      date: new Date().toISOString(),
      status: "Pending"
    };
    
    const existing = JSON.parse(localStorage.getItem("quantumDeposits") || "[]");
    localStorage.setItem("quantumDeposits", JSON.stringify([deposit, ...existing]));
    
    setIsSubmitting(false);
    onSubmit();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Deposit Funds</h2>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Method</label>
            <select 
              value={method} 
              onChange={(e) => { setMethod(e.target.value); setOption(""); }} 
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="crypto">Cryptocurrency</option>
              <option value="fiat">Fiat Payment</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {method === "crypto" ? "Select Coin" : "Select Payment Method"}
            </label>
            <select 
              value={option} 
              onChange={(e) => setOption(e.target.value)} 
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select an option</option>
              {method === "crypto" ? (
                <>
                  <option value="BTC">Bitcoin (BTC)</option>
                  <option value="ETH">Ethereum (ETH)</option>
                  <option value="USDT">Tether (USDT)</option>
                </>
              ) : (
                <>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="PayPal">PayPal</option>
                </>
              )}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount (USD)</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="block w-full pl-7 pr-12 py-2 border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                placeholder="0.00"
                min="10"
              />
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!option || !amount || isSubmitting}
            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              (!option || !amount || isSubmitting) ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Processing...' : 'Deposit'}
          </button>
        </div>
      </div>
    </div>
  );
};

const WithdrawModal = ({ onClose, onSubmit }) => {
  const [method, setMethod] = useState("crypto");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!address || !amount) return;
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const withdrawal = {
      id: Date.now(),
      method,
      amount: parseFloat(amount),
      address,
      date: new Date().toISOString(),
      status: "Pending"
    };
    
    const existing = JSON.parse(localStorage.getItem("quantumWithdrawals") || "[]");
    localStorage.setItem("quantumWithdrawals", JSON.stringify([withdrawal, ...existing]));
    
    setIsSubmitting(false);
    onSubmit();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Withdraw Funds</h2>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Method</label>
            <select 
              value={method} 
              onChange={(e) => setMethod(e.target.value)} 
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="crypto">Cryptocurrency</option>
              <option value="bank">Bank Transfer</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {method === "crypto" ? "Wallet Address" : "Bank Details"}
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder={method === "crypto" ? "0x..." : "Account number, routing, etc."}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount (USD)</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="block w-full pl-7 pr-12 py-2 border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                placeholder="0.00"
                min="10"
              />
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!address || !amount || isSubmitting}
            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              (!address || !amount || isSubmitting) ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Processing...' : 'Withdraw'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper function
const formatCurrency = (amount) => {
  if (typeof amount !== "number") {
    amount = parseFloat(amount) || 0;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export default Dashboard;
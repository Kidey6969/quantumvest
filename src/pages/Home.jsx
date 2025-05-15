import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [startTime] = useState(new Date());
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const stats = {
    activeMiners: "1.7K+",
    totalEarnings: "$3.45M+",
    totalInvested: "$1.76M+",
  };

  const plans = [
    { coin: "BTC", roi: "2x", duration: "3w", hash: "140TH/s" },
    { coin: "ETH", roi: "1.6x", duration: "4w", hash: "110TH/s" },
    { coin: "USDT", roi: "1.4x", duration: "5w", hash: "95TH/s" },
  ];

  const sponsorLogos = [
    { name: "Wells Fargo", url: "wellsfargo.com" },
    { name: "TradingView", url: "tradingview.com" },
    { name: "Robinhood", url: "robinhood.com" },
    { name: "Mastercard", url: "mastercard.com" },
    { name: "Binance", url: "binance.com" },
    { name: "Forbes", url: "forbes.com" },
  ];

  const generateNotification = () => {
    const names = ["Alex K.", "Jamie L.", "Taylor M.", "Morgan S.", "Casey D."];
    const cities = ["NY", "TOR", "LDN", "SYD", "CHI"];
    const type = Math.random() > 0.5 ? "deposit" : "withdrawal";
    const amount = Math.floor(Math.random() * 90000 + 800);
    return {
      id: Date.now(),
      name: names[Math.floor(Math.random() * names.length)],
      location: cities[Math.floor(Math.random() * cities.length)],
      type,
      amount: `$${(amount/1000).toFixed(1)}K`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const note = generateNotification();
      setNotifications([note]);
      setTimeout(() => setNotifications([]), 4000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleRegisterClick = (e) => {
    e.preventDefault();
    setIsRegistering(true);
    // Simulate registration process
    setTimeout(() => {
      navigate('/register');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-900">
            Quantum<span className="text-yellow-500">Vest</span>
          </Link>
          
          <div className="flex space-x-3">
            <Link 
              to="/login" 
              className="px-4 py-2 text-sm font-medium text-blue-900 border border-blue-900 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              onClick={handleRegisterClick}
              className={`px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-lg hover:from-yellow-600 hover:to-yellow-500 transition-colors ${
                isRegistering ? 'opacity-75' : ''
              }`}
            >
              {isRegistering ? 'Loading...' : 'Register'}
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* Notification */}
        <AnimatePresence>
          {notifications.map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`fixed bottom-4 right-4 z-50 p-4 rounded-lg shadow-lg w-72 ${
                n.type === "deposit" 
                  ? "bg-green-50 border-l-4 border-green-500" 
                  : "bg-red-50 border-l-4 border-red-500"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-sm">{n.name}</p>
                  <p className="text-xs text-gray-500">{n.location}</p>
                </div>
                <span className="text-xs text-gray-500">{n.time}</span>
              </div>
              <div className="mt-2 flex items-center">
                <span className={`font-bold ${
                  n.type === "deposit" ? "text-green-600" : "text-red-600"
                }`}>
                  {n.amount}
                </span>
                <span className="ml-2 text-xs bg-white px-2 py-1 rounded-full">
                  {n.type.toUpperCase()}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Hero */}
        <section className="text-center bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16 px-6 rounded-xl shadow-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-4">Start Crypto Mining Today</h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8">
              Join thousands earning passive income with our secure, high-performance mining platform
            </p>
            <Link 
              to="/register" 
              onClick={handleRegisterClick}
              className={`inline-block px-8 py-3 text-lg font-semibold bg-yellow-400 text-blue-900 rounded-full hover:bg-yellow-300 transition-colors ${
                isRegistering ? 'opacity-75' : ''
              }`}
            >
              {isRegistering ? 'Loading...' : 'Get Started'}
            </Link>
          </motion.div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Object.entries(stats).map(([key, value]) => (
            <motion.div 
              key={key}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-sm text-center"
            >
              <p className="text-3xl font-bold text-blue-600">{value}</p>
              <p className="text-xs text-gray-500 uppercase mt-1 tracking-wider">
                {key.replace(/([A-Z])/g, ' $1')}
              </p>
            </motion.div>
          ))}
        </section>

        {/* Plans */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-center">Popular Mining Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((p, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{p.coin}</h3>
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                    {p.duration}
                  </span>
                </div>
                <div className="space-y-3 text-sm">
                  <p><span className="text-gray-500">ROI:</span> <span className="font-medium">{p.roi}</span></p>
                  <p><span className="text-gray-500">Hash Rate:</span> <span className="font-medium">{p.hash}</span></p>
                </div>
                <Link 
                  to="/register" 
                  onClick={handleRegisterClick}
                  className={`mt-6 block w-full text-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${
                    isRegistering ? 'opacity-75' : ''
                  }`}
                >
                  Start Mining
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TradingView */}
        <section className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Live Market Data</h2>
          <div className="h-[400px] rounded-lg overflow-hidden">
            <iframe
              src="https://s.tradingview.com/widgetembed/?symbol=BITSTAMP:BTCUSD&interval=30&theme=light&style=1&locale=en"
              height="100%"
              width="100%"
              frameBorder="0"
              allowTransparency="true"
              title="Live BTC Chart"
            ></iframe>
          </div>
        </section>

        {/* Sponsors */}
        <section className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-center">Trusted By Industry Leaders</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center">
            {sponsorLogos.map((sponsor, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="flex justify-center"
              >
                <img 
                  src={`https://logo.clearbit.com/${sponsor.url}?size=120`} 
                  alt={sponsor.name}
                  className="h-10 object-contain opacity-70 hover:opacity-100 transition-opacity"
                  title={sponsor.name}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* About */}
        <section className="text-center">
          {showAbout ? (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-white p-6 rounded-xl shadow-sm overflow-hidden"
            >
              <h2 className="text-xl font-semibold mb-2">About QuantumVest</h2>
              <p className="text-gray-600 mb-4">
                We provide institutional-grade crypto mining solutions with data centers across North America and Europe.
                Our platform offers transparent, secure mining with competitive returns.
              </p>
              <button 
                onClick={() => setShowAbout(false)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Show Less
              </button>
            </motion.div>
          ) : (
            <button 
              onClick={() => setShowAbout(true)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Learn More About Us
            </button>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} QuantumVest. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
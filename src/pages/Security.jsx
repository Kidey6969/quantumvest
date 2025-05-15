import React, { useState } from "react";

const Security = () => {
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);

  const sessionLogs = [
    { id: 1, location: "New York, USA", time: "2025-05-12 14:33", status: "Success" },
    { id: 2, location: "London, UK", time: "2025-05-11 22:10", status: "Failed" },
    { id: 3, location: "Lagos, NG", time: "2025-05-10 08:15", status: "Success" },
  ];

  return (
    <div className="text-darkBlue space-y-8">
      <h1 className="text-3xl font-bold">Security Settings</h1>

      {/* Two Factor Auth Toggle */}
      <section className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold">Two-Factor Authentication (2FA)</h2>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={twoFAEnabled}
            onChange={() => setTwoFAEnabled(!twoFAEnabled)}
            className="w-5 h-5"
          />
          Enable 2FA for login
        </label>
      </section>

      {/* Email Login Alerts */}
      <section className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold">Login Email Alerts</h2>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={emailAlerts}
            onChange={() => setEmailAlerts(!emailAlerts)}
            className="w-5 h-5"
          />
          Send email alerts for every login attempt
        </label>
      </section>

      {/* Session Logs */}
      <section className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Login Session Logs</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Location</th>
              <th className="py-2">Time</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {sessionLogs.map((log) => (
              <tr key={log.id} className="border-b last:border-none">
                <td className="py-2">{log.location}</td>
                <td className="py-2">{log.time}</td>
                <td className={`py-2 font-medium ${
                  log.status === "Success" ? "text-green-600" : "text-red-500"
                }`}>{log.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Security;

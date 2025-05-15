import React, { useEffect, useState } from "react";

const AdminMineManager = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("quantumUsers");
    if (stored) {
      setUsers(JSON.parse(stored));
    }
  }, []);

  const handleChange = (email, field, value) => {
    const updated = users.map((user) =>
      user.email === email ? { ...user, [field]: value } : user
    );
    setUsers(updated);
  };

  const handleSave = (email) => {
    const updatedUsers = users.map((user) =>
      user.email === email ? user : user
    );
    localStorage.setItem("quantumUsers", JSON.stringify(updatedUsers));
    alert("User data updated successfully.");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-darkBlue">Manage Mining Plans</h2>
      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded p-4">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Balance ($)</th>
                <th className="px-4 py-2">Plan</th>
                <th className="px-4 py-2">Duration</th>
                <th className="px-4 py-2">ROI</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.email} className="border-t">
                  <td className="px-4 py-2">{u.name}</td>
                  <td className="px-4 py-2">{u.email}</td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      className="border rounded px-2 py-1 w-28"
                      value={u.balance || 0}
                      onChange={(e) =>
                        handleChange(u.email, "balance", Number(e.target.value))
                      }
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      className="border rounded px-2 py-1"
                      value={u.plan || ""}
                      onChange={(e) =>
                        handleChange(u.email, "plan", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      className="border rounded px-2 py-1"
                      value={u.duration || ""}
                      onChange={(e) =>
                        handleChange(u.email, "duration", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      className="border rounded px-2 py-1 w-20"
                      value={u.roi || ""}
                      onChange={(e) =>
                        handleChange(u.email, "roi", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleSave(u.email)}
                      className="bg-gold text-darkBlue px-3 py-1 rounded hover:bg-yellow-500 text-sm"
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminMineManager;

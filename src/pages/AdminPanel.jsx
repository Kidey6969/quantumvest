import React, { useState } from "react";

const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    balance: 15450,
    activePlans: 2,
    status: "Active",
    role: "User",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    balance: 32500,
    activePlans: 3,
    status: "Suspended",
    role: "User",
  },
  {
    id: 3,
    name: "Admin Test",
    email: "admin@quantumvest.com",
    balance: 0,
    activePlans: 0,
    status: "Active",
    role: "Admin",
  },
];

const AdminPanel = () => {
  const [users, setUsers] = useState(mockUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editField, setEditField] = useState({});

  const updateUser = () => {
    const updated = users.map((u) =>
      u.id === selectedUser.id ? { ...selectedUser, ...editField } : u
    );
    setUsers(updated);
    setSelectedUser(null);
    setEditField({});
  };

  const suspendUser = (id) => {
    setUsers(users.map((u) => u.id === id ? { ...u, status: "Suspended" } : u));
  };

  const activateUser = (id) => {
    setUsers(users.map((u) => u.id === id ? { ...u, status: "Active" } : u));
  };

  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div className="text-darkBlue p-6 space-y-6">
      <h1 className="text-3xl font-bold">Admin Control Panel</h1>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">All Users</h2>
        <div className="overflow-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-lightBg border-b">
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Email</th>
                <th className="text-left p-2">Balance</th>
                <th className="text-left p-2">Plans</th>
                <th className="text-left p-2">Status</th>
                <th className="text-left p-2">Role</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">${user.balance.toLocaleString()}</td>
                  <td className="p-2">{user.activePlans}</td>
                  <td className={`p-2 ${user.status === 'Suspended' ? 'text-red-500' : 'text-green-600'}`}>{user.status}</td>
                  <td className="p-2">{user.role}</td>
                  <td className="p-2 space-x-2">
                    <button onClick={() => setSelectedUser(user)} className="text-blue-600">Edit</button>
                    {user.status === 'Active' ? (
                      <button onClick={() => suspendUser(user.id)} className="text-yellow-600">Suspend</button>
                    ) : (
                      <button onClick={() => activateUser(user.id)} className="text-green-600">Activate</button>
                    )}
                    <button onClick={() => deleteUser(user.id)} className="text-red-600">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {selectedUser && (
        <section className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Edit User: {selectedUser.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Name"
              defaultValue={selectedUser.name}
              onChange={(e) => setEditField({ ...editField, name: e.target.value })}
              className="border px-3 py-2 rounded"
            />
            <input
              placeholder="Email"
              defaultValue={selectedUser.email}
              onChange={(e) => setEditField({ ...editField, email: e.target.value })}
              className="border px-3 py-2 rounded"
            />
            <input
              type="number"
              placeholder="Balance"
              defaultValue={selectedUser.balance}
              onChange={(e) => setEditField({ ...editField, balance: Number(e.target.value) })}
              className="border px-3 py-2 rounded"
            />
            <input
              type="number"
              placeholder="Active Plans"
              defaultValue={selectedUser.activePlans}
              onChange={(e) => setEditField({ ...editField, activePlans: Number(e.target.value) })}
              className="border px-3 py-2 rounded"
            />
          </div>
          <div className="mt-4 space-x-4">
            <button onClick={updateUser} className="bg-gold text-darkBlue px-4 py-2 rounded hover:opacity-90">Save Changes</button>
            <button onClick={() => setSelectedUser(null)} className="text-red-600">Cancel</button>
          </div>
        </section>
      )}
    </div>
  );
};

export default AdminPanel;

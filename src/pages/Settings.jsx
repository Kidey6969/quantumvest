import React, { useState } from "react";

const Settings = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    notifications: true,
    avatar: null,
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleToggle = () => {
    setProfile({ ...profile, notifications: !profile.notifications });
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="text-darkBlue space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>

      {/* Profile Info */}
      <section className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold">Profile</h2>
        <input
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full border px-4 py-2 rounded"
        />
        <input
          name="email"
          value={profile.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border px-4 py-2 rounded"
        />
      </section>

      {/* Avatar Upload */}
      <section className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold">Avatar</h2>
        {profile.avatar && <img src={profile.avatar} alt="Avatar" className="w-20 h-20 rounded-full" />}
        <input type="file" accept="image/*" onChange={handleAvatarUpload} />
      </section>

      {/* Notifications */}
      <section className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold">Notifications</h2>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={profile.notifications}
            onChange={handleToggle}
            className="w-5 h-5"
          />
          Enable Email Notifications
        </label>
      </section>

      {/* Danger Zone */}
      <section className="bg-red-50 p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold text-red-600">Danger Zone</h2>
        <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
          Reset Password
        </button>
        <button className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800">
          Delete Account
        </button>
      </section>
    </div>
  );
};

export default Settings;

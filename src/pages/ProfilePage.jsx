import React, { useState, useEffect } from 'react';
import { fetchAdmin, updateAdmin } from '../services';

const ProfilePage = () => {
  const [admin, setAdmin] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        const data = await fetchAdmin();
        setAdmin(data);
        setLoading(false);
      } catch (err) {
        setError('Error loading admin data');
        setLoading(false);
      }
    };
    loadAdminData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prevAdmin) => ({
      ...prevAdmin,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await updateAdmin(admin);
      console.log("Admin data:", admin);
      alert('Profile updated successfully');
    } catch (err) {
      console.log("Admin data error:", err);
      alert('Error updating profile');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-blue-600">Admin Profile</h2>
      <div className="mt-4">
        <label className="block mb-2">Username:</label>
        <input
          type="text"
          name="username"
          value={admin.username}
          onChange={handleInputChange}
          className="border p-2 w-full"
        />
      </div>
      <div className="mt-4">
        <label className="block mb-2">Email:</label>
        <input
          type="email"
          name="email"
          value={admin.email}
          onChange={handleInputChange}
          className="border p-2 w-full"
        />
      </div>
      <div className="mt-4">
        <label className="block mb-2">Password:</label>
        <input
          type="password"
          name="password"
          value={admin.password}
          onChange={handleInputChange}
          className="border p-2 w-full"
        />
      </div>
      <button
        onClick={handleUpdate}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
      >
        Update Profile
      </button>
    </div>
  );
};

export default ProfilePage;

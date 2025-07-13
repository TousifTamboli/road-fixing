import React, { useState } from "react";
import axios from "axios";

function AdminLogin({ onLoginSuccess }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        { ...form, role: "admin" }
      );

      localStorage.setItem("token", res.data.token);
          localStorage.setItem("admin", JSON.stringify(res.data.user));  // <-- This line

      alert("Login successful");
      onLoginSuccess(); // ✅ Trigger dashboard view
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || "Server error"));
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-sm mx-auto mt-20 p-6 shadow-lg bg-white rounded">
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Admin Email"
        className="input-field mb-3"
        required
      />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        className="input-field mb-4"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Login
      </button>
    </form>
  );
}

export default AdminLogin;

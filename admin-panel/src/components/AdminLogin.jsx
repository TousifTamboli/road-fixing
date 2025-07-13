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
      localStorage.setItem("admin", JSON.stringify(res.data.user));

      alert("Login successful");
      onLoginSuccess();
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || "Server error"));
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="
        max-w-md mx-auto mt-24 p-8 
        bg-white bg-opacity-90 
        rounded-2xl 
        shadow-md
        ring-1 ring-gray-300
        backdrop-blur-sm
      "
    >
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
        Admin Login
      </h2>

      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Admin Email"
        className="
          w-full mb-5 px-4 py-3
          border border-gray-300 
          rounded-lg 
          focus:outline-none 
          focus:ring-2 focus:ring-blue-400
          transition
        "
        required
      />

      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        className="
          w-full mb-6 px-4 py-3
          border border-gray-300 
          rounded-lg
          focus:outline-none 
          focus:ring-2 focus:ring-blue-400
          transition
        "
        required
      />

      <button
        type="submit"
        className="
          w-full py-3 
          bg-blue-600 
          hover:bg-blue-700 
          text-white 
          font-medium 
          rounded-lg 
          shadow-md
          transition
          duration-300
        "
      >
        Login
      </button>
    </form>
  );
}

export default AdminLogin;

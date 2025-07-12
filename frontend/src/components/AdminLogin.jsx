import { useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

function AdminLogin({ setIsLogin }) {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, {
        ...form,
        role: "admin"
      });
      alert("Admin login successful!");
      console.log(res.data);

      localStorage.setItem("token", res.data.token);

      // TODO: redirect to admin dashboard
    } catch (err) {
      alert("Admin login failed: " + (err.response?.data?.message || "Server error"));
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Admin Email"
        className="input-field"
        value={form.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="input-field"
        value={form.password}
        onChange={handleChange}
      />
      <button type="submit" className="w-full mt-3 bg-red-600 text-white py-2 rounded">
        Login as Admin
      </button>
    </form>
  );
}

export default AdminLogin;

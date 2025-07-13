import React, { useState } from "react";

function UserLogin({ setIsLogin, onLoginSuccess }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Track role: "user" or "admin"
  const [role, setRole] = useState("user");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, role }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      alert("Login successful!");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      onLoginSuccess(data.user);
    } catch (err) {
      alert("Login failed: " + err.message);
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      {/* Role toggle */}
      <div className="flex justify-center mb-6 space-x-4">
        <button
          type="button"
          className={`py-2 px-6 rounded ${
            role === "user"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setRole("user")}
        >
          User
        </button>
        <button
          type="button"
          className={`py-2 px-6 rounded ${
            role === "admin"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setRole("admin")}
        >
          Admin
        </button>
      </div>

      <form onSubmit={handleLogin}>
        <h2 className="text-xl font-bold mb-4 text-center">{role === "user" ? "User" : "Admin"} Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input-field mb-3 w-full px-3 py-2 border rounded"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input-field mb-3 w-full px-3 py-2 border rounded"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full mt-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        Don't have an account?{" "}
        <span
          className="text-blue-600 cursor-pointer hover:underline"
          onClick={() => setIsLogin(false)}
        >
          Register
        </span>
      </p>
    </div>
  );
}

export default UserLogin;

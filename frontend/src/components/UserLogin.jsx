import { useState } from "react";
import axios from "axios";

function UserLogin({ setIsLogin, onLoginSuccess }) {  // <== Add onLoginSuccess here
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

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, {
        ...form,
        role: "user",
      });

      alert("Login successful!");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      onLoginSuccess(res.data.user); // This now works correctly
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || "Server error"));
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2 className="text-xl font-bold mb-4 text-center">User Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
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
      <button
        type="submit"
        className="w-full mt-3 bg-blue-600 text-white py-2 rounded"
      >
        Login
      </button>

      <p className="mt-2 text-sm text-right text-blue-500 cursor-pointer">
        Forgot Password?
      </p>
      <p className="text-sm text-center mt-3">
        Don't have an account?{" "}
        <span
          className="text-blue-600 cursor-pointer"
          onClick={() => setIsLogin(false)}
        >
          Register
        </span>
      </p>
    </form>
  );
}

export default UserLogin;

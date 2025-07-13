import { useState } from "react";
import axios from "axios";
import React from "react";

function UserRegister({ setIsLogin }) {
  const [form, setForm] = useState({
    name: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/register`, form);
      alert("Registration successful!");
      console.log(res.data);
      setIsLogin(true); // go back to login form
    } catch (err) {
      alert("Registration failed: " + err.response?.data?.message);
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4 text-center">User Register</h2>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        className="input-field"
        value={form.name}
        onChange={handleChange}
      />
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
        className="w-full mt-3 bg-green-600 text-white py-2 rounded"
      >
        Register
      </button>
      <p className="text-sm text-center mt-3">
        Already have an account?{" "}
        <span
          className="text-blue-600 cursor-pointer"
          onClick={() => setIsLogin(true)}
        >
          Login
        </span>
      </p>
    </form>
  );
}

export default UserRegister;

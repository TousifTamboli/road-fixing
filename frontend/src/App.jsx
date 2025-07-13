import { useState, useEffect } from "react";
import UserLogin from "./components/UserLogin";
import UserRegister from "./components/UserRegister";
import Dashboard from "./components/Dashboard";
import './index.css';
import React from "react";


function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);
  const [view, setView] = useState("addComplaint");

  // ✅ load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // ✅ save it
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user"); 
  };

  return (
    <div>
      {!user ? (
        isLogin ? (
          <UserLogin setIsLogin={setIsLogin} onLoginSuccess={handleLoginSuccess} />
        ) : (
          <UserRegister setIsLogin={setIsLogin} />
        )
      ) : (
        <Dashboard user={user} onLogout={handleLogout} onView={setView} view={view} />
      )}
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import UserLogin from "./components/UserLogin";
import UserRegister from "./components/UserRegister";
import Dashboard from "./components/Dashboard";
import axios from "axios";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);
  const [view, setView] = useState("addComplaint"); // default view

  // After login, set user state:
  // You can decode JWT or fetch user info from backend (simplify for now)

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <div>
      {!user ? (
        isLogin ? (
          <UserLogin
            setIsLogin={setIsLogin}
            onLoginSuccess={handleLoginSuccess}  // pass callback prop
          />
        ) : (
          <UserRegister setIsLogin={setIsLogin} />
        )
      ) : (
        <Dashboard
          user={user}
          onLogout={handleLogout}
          onView={setView}
          view={view}
        />
      )}
    </div>
  );
}

export default App;

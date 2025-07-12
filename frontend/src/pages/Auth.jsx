import { useState } from "react";
import UserLogin from "../components/UserLogin";
import UserRegister from "../components/UserRegister";
import AdminLogin from "../components/AdminLogin";

function Auth() {
  const [role, setRole] = useState("user");
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        {/* Role Toggle */}
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 rounded-l-full font-semibold ${
              role === "user" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setRole("user")}
          >
            User
          </button>
          <button
            className={`px-4 py-2 rounded-r-full font-semibold ${
              role === "admin" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setRole("admin")}
          >
            Admin
          </button>
        </div>

        {/* Conditional Rendering */}
        {role === "user" ? (
          isLogin ? (
            <UserLogin setIsLogin={setIsLogin} />
          ) : (
            <UserRegister setIsLogin={setIsLogin} />
          )
        ) : (
          <AdminLogin />
        )}
      </div>
    </div>
  );
}

export default Auth;

import React, { useEffect, useState } from "react";
import AdminLogin from "./components/AdminLogin";
import ComplaintCard from "./components/ComplaintCard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    if (isLoggedIn) fetchComplaints();
  }, [isLoggedIn]);

  const fetchComplaints = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/complaints/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setComplaints(data.complaints);
      else throw new Error(data.message);
    } catch (err) {
      alert("Error fetching complaints: " + err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {!isLoggedIn ? (
        <AdminLogin onLoginSuccess={() => setIsLoggedIn(true)} />
      ) : (
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">All User Complaints</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
          {complaints.length === 0 ? (
            <p>No complaints found.</p>
          ) : (
            complaints.map((c) => <ComplaintCard key={c._id} complaint={c} />)
          )}
        </div>
      )}
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import ComplaintCard from "./ComplaintCard";
import axios from "axios";

function AdminDashboard({ onLogout }) {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/complaints/all`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const pendingComplaints = res.data.complaints.filter(
          (c) => c.status !== "Resolved"
        );
        setComplaints(pendingComplaints);
      } catch (err) {
        console.error("Error fetching complaints", err);
      }
    };
    fetchComplaints();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("token");
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-900 via-indigo-900 to-purple-900 p-8">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
          Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300"
        >
          Logout
        </button>
      </div>

      {complaints.length === 0 ? (
        <p className="text-center text-white text-xl mt-20">
          🎉 No pending complaints. All caught up!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {complaints.map((complaint) => (
            <div
              key={complaint._id}
              className="
                bg-white/10
                backdrop-blur-md
                border border-white/30
                rounded-3xl
                p-6
                shadow-xl
                hover:scale-[1.03]
                transition-transform
                duration-300
                cursor-pointer
              "
            >
              <ComplaintCard complaint={complaint} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;

import React, { useEffect, useState } from "react";
import ComplaintCard from "./ComplaintCard";
import axios from "axios";

function AdminDashboard({ onLogout }) {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/complaints/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setComplaints(res.data.complaints);
      } catch (err) {
        console.error("Error fetching complaints", err);
      }
    };
    fetchComplaints();
  }, []);

  // ✅ Move this inside the component
  const handleLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("token");
    onLogout(); // properly called here
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {complaints.map((complaint) => (
          <ComplaintCard key={complaint._id} complaint={complaint} />
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;

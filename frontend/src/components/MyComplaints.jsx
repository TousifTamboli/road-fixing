import { useEffect, useState } from "react";
import React from "react";

function MyComplaints({ user }) {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/complaints/mine`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setComplaints(data.complaints);
        } else {
          alert("Failed to fetch complaints: " + data.message);
        }
      } catch (err) {
        console.error("Error fetching complaints:", err);
        alert("Server error while fetching complaints");
      }
    };

    fetchComplaints();
  }, []);

  const toggleDetails = (id) => {
    setSelectedComplaintId((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Complaints</h2>
      {complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <div className="space-y-4">
          {complaints.map((complaint) => (
            <div
              key={complaint._id}
              className="border rounded shadow-md p-4 bg-white cursor-pointer hover:shadow-lg transition"
              onClick={() => toggleDetails(complaint._id)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  {complaint.type} - {new Date(complaint.createdAt).toLocaleDateString()}
                </h3>
                <span
                  className={`text-sm px-2 py-1 rounded ${
                    complaint.status === "Pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-green-200 text-green-800"
                  }`}
                >
                  {complaint.status}
                </span>
              </div>

              {selectedComplaintId === complaint._id && (
                <div className="mt-4 border-t pt-4">
                  <p><strong>Name:</strong> {complaint.name}</p>
                  <p><strong>Email:</strong> {complaint.email}</p>
                  <p><strong>Phone:</strong> {complaint.phone}</p>
                  <p><strong>Age:</strong> {complaint.age}</p>
                  <p><strong>Landmark:</strong> {complaint.landmark}</p>
                  <p><strong>Location:</strong> <a href={complaint.locationLink} target="_blank" className="text-blue-600 underline">Open Map</a></p>
                  <p className="mt-2"><strong>Description:</strong> {complaint.description}</p>

                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {complaint.images.map((url, idx) => (
                      <img
                        key={idx}
                        src={url}
                        alt={`Complaint ${idx + 1}`}
                        className="w-full h-40 object-cover rounded"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyComplaints;

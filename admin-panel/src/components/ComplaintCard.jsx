// src/components/ComplaintCard.jsx
import React, { useState } from "react";

function ComplaintCard({ complaint, onResolved }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleResolve = async () => {
    if (files.length !== 5) return alert("Exactly 5 images required");

    setLoading(true);
    const imageUrls = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      imageUrls.push(data.secure_url);
    }

    const token = localStorage.getItem("token");

    const updateRes = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/complaints/resolve/${complaint._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ resolvedImages: imageUrls }),
      }
    );

    const result = await updateRes.json();
    setLoading(false);
    if (updateRes.ok) {
      alert("Complaint resolved!");
      onResolved(); // refresh the list
    } else {
      alert("Error: " + result.message);
    }
  };

  return (
    <div className="bg-white shadow-md p-4 rounded mb-4">
      <h3 className="text-xl font-semibold mb-2">{complaint.type}</h3>
      <p><strong>Name:</strong> {complaint.name}</p>
      <p><strong>Email:</strong> {complaint.email}</p>
      <p><strong>Status:</strong> {complaint.status}</p>
      <p><strong>Date:</strong> {new Date(complaint.createdAt).toLocaleDateString()}</p>
      <div className="my-2 flex gap-2 overflow-x-auto">
        {complaint.images.map((img, i) => (
          <img key={i} src={img} alt="complaint" className="h-24 rounded" />
        ))}
      </div>

      {complaint.status === "Pending" && (
        <>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="block my-2"
          />
          <button
            onClick={handleResolve}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Resolving..." : "Mark as Resolved"}
          </button>
        </>
      )}
    </div>
  );
}

export default ComplaintCard;

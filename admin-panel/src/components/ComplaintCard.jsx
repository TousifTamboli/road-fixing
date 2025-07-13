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
      onResolved();
    } else {
      alert("Error: " + result.message);
    }
  };

  return (
    <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-xl shadow-lg p-6 mb-6 transition-shadow hover:shadow-2xl">
      <h3 className="text-2xl font-semibold mb-3 text-gray-800 border-b pb-2">{complaint.type}</h3>

      <div className="space-y-1 text-gray-700 mb-4">
        <p><span className="font-medium text-gray-900">Name:</span> {complaint.name}</p>
        <p><span className="font-medium text-gray-900">Email:</span> {complaint.email}</p>
        <p><span className="font-medium text-gray-900">Status:</span> 
          <span className={`ml-2 px-2 py-0.5 rounded-full text-sm font-semibold
            ${complaint.status === "Pending" ? "bg-yellow-200 text-yellow-800" : "bg-green-200 text-green-800"}`}>
            {complaint.status}
          </span>
        </p>
        <p><span className="font-medium text-gray-900">Date:</span> {new Date(complaint.createdAt).toLocaleDateString()}</p>
      </div>

      <div className="flex gap-3 overflow-x-auto mb-5">
        {complaint.images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="complaint"
            className="h-28 rounded-lg object-cover border border-gray-300 shadow-sm hover:scale-105 transition-transform"
            loading="lazy"
          />
        ))}
      </div>

      {complaint.status === "Pending" && (
        <>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
              cursor-pointer
              mb-4"
          />
          <button
            onClick={handleResolve}
            disabled={loading}
            className={`w-full py-2 rounded-lg font-semibold text-white transition
              ${loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
          >
            {loading ? "Resolving..." : "Mark as Resolved"}
          </button>
        </>
      )}
    </div>
  );
}

export default ComplaintCard;

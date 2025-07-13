import { useState } from "react";
import React from "react";

function AddComplaint({ user }) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    age: "",
    phone: "",
    email: user?.email || "",
    type: "",
    description: "",
    locationLink: "",
    landmark: "",
    date: new Date().toISOString().split("T")[0],
    images: [],
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      images: Array.from(e.target.files),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|in)$/i;

    if (!phoneRegex.test(formData.phone)) {
      return alert("Enter a valid 10-digit Indian phone number.");
    }

    if (!emailRegex.test(formData.email)) {
      return alert("Email must end with .com or .in");
    }

    if (formData.description.length < 20) {
      return alert("Description must be at least 20 characters.");
    }

    if (formData.images.length !== 5) {
      return alert("Exactly 5 images are required.");
    }

    try {
      const imageUrls = [];

      for (const img of formData.images) {
        const data = new FormData();
        data.append("file", img);
        data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);

        const uploadRes = await fetch(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD}/image/upload`,
          {
            method: "POST",
            body: data,
          }
        );

        const fileData = await uploadRes.json();
        imageUrls.push(fileData.secure_url);
      }

      const payload = { ...formData, images: imageUrls };
      const token = localStorage.getItem("token");

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/complaints/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (res.ok) alert("Complaint submitted successfully!");
      else alert("Failed: " + result.message);
    } catch (err) {
      alert("Server error!");
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm shadow-xl rounded-3xl p-8 mt-6 transition-all"
    >
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
        🚧 Add New Complaint
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 px-4 py-2"
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          onChange={handleChange}
          className="rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 px-4 py-2"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          className="rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 px-4 py-2"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 px-4 py-2"
          required
        />
        <input
          type="text"
          value={formData.date}
          disabled
          className="rounded-xl bg-gray-100 border-gray-300 shadow-sm px-4 py-2"
        />
        <select
          name="type"
          onChange={handleChange}
          className="rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 px-4 py-2"
          required
        >
          <option value="">-- Select Complaint Type --</option>
          <option value="Road Damage">Road Damage</option>
          <option value="Drainage Damage">Drainage Damage</option>
          <option value="Partial Road Made">Partial Road Made</option>
          <option value="Water Draining Problem">Water Draining Problem</option>
        </select>
        <input
          type="text"
          name="landmark"
          placeholder="Nearby Landmark"
          onChange={handleChange}
          className="rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 px-4 py-2"
          required
        />
        <input
          type="url"
          name="locationLink"
          placeholder="Google Maps Link"
          onChange={handleChange}
          className="rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 px-4 py-2"
          required
        />
      </div>

      <textarea
        name="description"
        rows={4}
        placeholder="Describe the issue clearly..."
        onChange={handleChange}
        className="mt-6 w-full rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 px-4 py-2"
        required
      ></textarea>

      <div className="mt-6">
        <label className="block font-medium text-gray-700 mb-2">Upload 5 Images</label>
        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="w-full"
          required
        />
      </div>

      <button
        type="submit"
        className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-3 font-semibold text-lg rounded-xl shadow-md transition-all duration-200"
      >
        🚀 Submit Complaint
      </button>
    </form>
  );
}

export default AddComplaint;

import { useState } from "react";

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

  // Phone validation (Indian 10-digit starting 6-9)
  const phoneRegex = /^[6-9]\d{9}$/;

  // Email validation: only .com or .in domains allowed
  const emailRegex = /^[^\s@]+@[^\s@]+\.(com|in)$/i;

  if (!phoneRegex.test(formData.phone)) {
    return alert("Please enter a valid 10-digit Indian phone number.");
  }

  if (!emailRegex.test(formData.email)) {
    return alert("Please enter a valid email address ending with .com or .in");
  }

  if (formData.description.length < 20) {
    return alert("Description must be at least 20 characters long.");
  }

  if (formData.images.length !== 5) {
    return alert("Please upload exactly 5 images.");
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

    const payload = {
      ...formData,
      images: imageUrls,
    };

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/complaints/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (res.ok) {
      alert("Complaint submitted successfully!");
    } else {
      alert("Failed: " + result.message);
    }
  } catch (err) {
    alert("Server error!");
    console.error(err);
  }
};



  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white shadow p-6 rounded mt-4"
    >
      <h2 className="text-2xl font-bold mb-4">Add New Complaint</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="input-field"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          className="input-field"
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          className="input-field"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="input-field"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          value={formData.date}
          disabled
          className="input-field"
        />
        <select
          name="type"
          className="input-field"
          onChange={handleChange}
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
          placeholder="Famous Landmark"
          className="input-field"
          onChange={handleChange}
          required
        />
        <input
          type="url"
          name="locationLink"
          placeholder="Google Maps Location Link"
          className="input-field"
          onChange={handleChange}
          required
        />
      </div>

      <textarea
        name="description"
        placeholder="Describe the issue clearly..."
        rows={4}
        className="input-field mt-4 w-full"
        onChange={handleChange}
        required
      ></textarea>

      <input
        type="file"
        name="images"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="mt-4"
        required
      />

      <button
        type="submit"
        className="mt-6 bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700"
      >
        Submit Complaint
      </button>
    </form>
  );
}

export default AddComplaint;

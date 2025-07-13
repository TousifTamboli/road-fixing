import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: Date, default: Date.now },
  type: {
    type: String,
    enum: ["Road Damage", "Drainage Damage", "Partial Road", "Water Draining Problem"],
    required: true,
  },
  images: { type: [String], required: true }, // URLs from Cloudinary
  description: { type: String, required: true },
  locationLink: { type: String, required: true },
  landmark: { type: String, required: true },
  status: { type: String, default: "Pending" },
}, { timestamps: true });

export default mongoose.model("Complaint", complaintSchema);

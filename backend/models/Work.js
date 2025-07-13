// models/Work.js
import mongoose from "mongoose";

const workSchema = new mongoose.Schema(
  {
    complaintId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Complaint",
      required: true,
    },
    resolvedImages: {
      type: [String], // cloudinary image URLs
      required: true,
    },
    dateResolved: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Work", workSchema);

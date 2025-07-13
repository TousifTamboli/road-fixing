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
      type: [String],
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
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

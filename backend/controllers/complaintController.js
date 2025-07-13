import Complaint from "../models/Complaint.js";

export const createComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.create(req.body);
    res.status(201).json({ message: "Complaint submitted successfully", complaint });
  } catch (err) {
    res.status(400).json({ message: "Error submitting complaint", error: err.message });
  }
};

import Complaint from "../models/Complaint.js";

export const createComplaint = async (req, res) => {
  try {
    const complaintData = req.body;
    complaintData.user = req.userId;  // link complaint to logged-in user

    const complaint = await Complaint.create(complaintData);
    res.status(201).json({ message: "Complaint created", complaint });
  } catch (err) {
    res.status(500).json({ message: "Error creating complaint", error: err.message });
  }
};

export const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.userId }).sort({ createdAt: -1 });
    res.status(200).json({ complaints });
  } catch (err) {
    res.status(500).json({ message: "Error fetching complaints", error: err.message });
  }
};

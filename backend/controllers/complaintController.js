import Complaint from "../models/Complaint.js";
import Work from "../models/Work.js";

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


// Get all complaints – for Admin
export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate("user", "name email").sort({ createdAt: -1 });
    res.status(200).json({ complaints });
  } catch (err) {
    res.status(500).json({ message: "Error fetching all complaints", error: err.message });
  }
};


export const markAsResolved = async (req, res) => {
  const { id } = req.params;
  const { resolvedImages } = req.body;

  if (!resolvedImages || resolvedImages.length !== 5) {
    return res.status(400).json({ message: "Exactly 5 images required." });
  }

  try {
    const complaint = await Complaint.findById(id).populate("user", "name email");
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    complaint.status = "Resolved";
    await complaint.save();

    const work = await Work.create({
      complaintId: id,
      resolvedImages,
      userName: complaint.user.name,
      userEmail: complaint.user.email,
    });

    res.status(200).json({ message: "Status updated & work logged", work });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


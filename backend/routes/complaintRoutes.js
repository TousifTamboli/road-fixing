import express from "express";
import { createComplaint, getMyComplaints } from "../controllers/complaintController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", verifyToken, createComplaint);
router.get("/mine", verifyToken, getMyComplaints);

export default router;

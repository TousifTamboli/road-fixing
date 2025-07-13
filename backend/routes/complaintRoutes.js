import express from "express";
import { createComplaint, getMyComplaints, getAllComplaints } from "../controllers/complaintController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", verifyToken, createComplaint);
router.get("/mine", verifyToken, getMyComplaints);
router.get("/all", verifyToken, getAllComplaints);


export default router;

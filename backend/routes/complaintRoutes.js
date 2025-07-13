import express from "express";
import { createComplaint, getMyComplaints, getAllComplaints } from "../controllers/complaintController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { markAsResolved } from "../controllers/complaintController.js";

const router = express.Router();

router.post("/create", verifyToken, createComplaint);
router.get("/mine", verifyToken, getMyComplaints);
router.get("/all", verifyToken, getAllComplaints);
router.put("/resolve/:id", verifyToken, markAsResolved);


export default router;

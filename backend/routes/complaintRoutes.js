import express from "express";
import { createComplaint } from "../controllers/complaintController.js";

const router = express.Router();
router.post("/create", createComplaint);
export default router;

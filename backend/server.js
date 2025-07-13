import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ for form-data


app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes); // ✅ add new route


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(5000, () => console.log("Server running on port 5000")))
  .catch(err => console.error("Mongo error:", err));

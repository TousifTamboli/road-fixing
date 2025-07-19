import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";

dotenv.config();
const app = express();

// app.options("*", cors())
// Middleware
const corsOptions = {
    "origin" : "*",
    "methods" : ["GET", "POST", "DELETE", "OPTIONS", "PUT"],
    "allowedHeaders" : ["content-type", "authorizations"],
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Default route to check API status
app.get("/", (req, res) => {
  res.send("API is working");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => app.listen(5000, () => console.log(" Server running on port 5000")))
.catch(err => console.error(" Mongo error:", err));

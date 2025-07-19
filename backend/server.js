import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";

dotenv.config();
const app = express();

// === CORS Configuration ===
const allowedOrigins = [
  "http://localhost:5173",                     // Local frontend
  "http://localhost:5174",                     // Local frontend
  "https://road-fixing-frontend.vercel.app",   // Deployed frontend
  "https://road-fixing-admin.vercel.app"              // Add your actual admin panel URL here
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed for this origin: " + origin));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// === Routes ===
app.get("/", (req, res) => {
  res.send("API is working ✅");
});

app.use("api/auth", authRoutes);
app.use("api/complaints", complaintRoutes);

// === MongoDB Connection ===
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT || 5000, () =>
      console.log(`✅ Server running on port ${process.env.PORT || 5000}`)
    )
  )
  .catch((err) => console.error("❌ Mongo error:", err));

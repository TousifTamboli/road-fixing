import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "admin"],
    required: true,
  },
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Auth", authSchema);

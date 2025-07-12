import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Auth from "./models/Auth.js";

dotenv.config();

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI);

  const hashedPassword = await bcrypt.hash("tousif3", 10);

  const admin = new Auth({
    role: "admin",
    name: "Goverment",
    email: "tousiftamboli3@gmail.com",
    password: hashedPassword
  });

  await admin.save();
  console.log("Admin created!");
  mongoose.disconnect();
}

createAdmin().catch(console.error);

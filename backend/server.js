import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import User from "./models/User.js";
import Student from "./models/Student.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// === Static frontend setup ===
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../frontend")));
/*
Name   : Avantika Shrivastava
Course : B.Tech (CSE)
Project: Data Visualization of Student Academic Performance Analysis
Year   : 2025
*/

// === MongoDB connection ===
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/student_performance";
mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// === Auth routes ===
app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ error: "Email already exists" });

  await User.create({ username, email, password });
  res.json({ message: "Registered successfully" });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "User not found" });
  if (user.password !== password) return res.status(400).json({ error: "Wrong password" });

  res.json({ message: "Login success", email: user.email, username: user.username });
});

// === Student data route ===
app.get("/api/student/:email", async (req, res) => {
  const student = await Student.findOne({ Email: req.params.email });
  if (!student) return res.status(404).json({ error: "Student data not found" });

  res.json(student);
});
/*
Name   : Avantika Shrivastava
Course : B.Tech (CSE)
Project: Data Visualization of Student Academic Performance Analysis
Year   : 2025
*/

// === Frontend routes ===
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dashboard.html"));
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/login.html"));
});

// === Start server ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

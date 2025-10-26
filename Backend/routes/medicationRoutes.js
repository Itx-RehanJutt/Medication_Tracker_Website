import express from "express";
import jwt from "jsonwebtoken";
import { Medication } from "../models/Medication.js";

const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Add Medication
router.post("/", verifyToken, async (req, res) => {
  try {
    const newMed = await Medication.create({ ...req.body, userId: req.userId });
    res.status(201).json(newMed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//  Get All Medications for Logged-In User
router.get("/", verifyToken, async (req, res) => {
  try {
    const meds = await Medication.find({ userId: req.userId });
    res.status(200).json(meds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

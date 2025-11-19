import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Booking from "../models/Booking.js";

const router = express.Router();

// CREATE BOOKING
router.post("/create", protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const { serviceId } = req.body;

    if (!serviceId) {
      return res.status(400).json({ message: "Service ID is required" });
    }

    const booking = new Booking({
      user: userId,
      service: serviceId,
      status: "pending",
      createdAt: new Date(),
    });

    await booking.save();

    res.json({ message: "Booking successful!", booking });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ message: "Booking failed", error: err.message });
  }
});

export default router;

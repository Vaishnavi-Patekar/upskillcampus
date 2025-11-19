import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import { protect } from "../middleware/authMiddleware.js";
import Booking from "../models/Booking.js";
import sendEmail from "../utils/sendEmail.js";
import generateReceiptPDF from "../utils/generateReceiptPDF.js";

const router = express.Router();

// Razorpay Instance
const razor = new Razorpay({
  key_id: "YOUR_RAZORPAY_KEY",
  key_secret: "YOUR_RAZORPAY_SECRET",
});

// INITIATE PAYMENT
router.post("/initiate", protect, async (req, res) => {
  try {
    const { serviceId, customerName, phone, address, date } = req.body;

    const booking = new Booking({
      user: req.user._id,
      service: serviceId,
      customerName,
      phone,
      address,
      date,
      status: "pending",
    });

    await booking.save();

    const options = {
      amount: booking.service.price * 100,
      currency: "INR",
      receipt: `receipt_${booking._id}`,
    };

    const order = await razor.orders.create(options);

    res.json({ paymentUrl: `https://checkout.razorpay.com/v1/checkout.js?order_id=${order.id}&booking=${booking._id}` });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment initiation failed" });
  }
});

// PAYMENT SUCCESS WEBHOOK
router.post("/verify", async (req, res) => {
  const { order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;

  const expected = crypto.createHmac("sha256", razor.key_secret)
    .update(order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (expected !== razorpay_signature) {
    return res.status(400).json({ message: "Invalid signature!" });
  }

  const booking = await Booking.findById(bookingId).populate("service user");

  booking.status = "confirmed";
  booking.paymentId = razorpay_payment_id;
  await booking.save();

  // Generate PDF Receipt
  const pdfPath = await generateReceiptPDF(booking);

  // Send Email
  await sendEmail(
    booking.user.email,
    "Booking Confirmed!",
    "Your booking is confirmed. Receipt attached.",
    pdfPath
  );

  res.json({ message: "Payment successful!" });
});

export default router;

import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// CREATE ORDER
router.post("/initiate", async (req, res) => {
  try {
    const { serviceId, customerName, phone, address, date, time } = req.body;

    const options = {
      amount: 50000,         // actual: service price * 100
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json({
      orderId: order.id,
      amount: options.amount,
      key: process.env.RAZORPAY_KEY_ID,
    });

  } catch (err) {
    console.log("Payment error:", err);
    res.status(500).send({ error: "Payment initiation failed" });
  }
});

export default router;

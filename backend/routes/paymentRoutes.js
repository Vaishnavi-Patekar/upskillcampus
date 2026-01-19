// import express from "express";
// import Razorpay from "razorpay";
// import crypto from "crypto";
// import { protect } from "../middleware/authMiddleware.js";
// import Booking from "../models/Booking.js";
// import sendEmail from "../utils/sendEmail.js";
// import generateReceiptPDF from "../utils/generateReceiptPDF.js";


// const router = express.Router();

// // Razorpay Instance
// const razor = new Razorpay({
//   key_id: "YOUR_RAZORPAY_KEY",
//   key_secret: "YOUR_RAZORPAY_SECRET",
// });

// // INITIATE PAYMENT
// router.post("/initiate", protect, async (req, res) => {
//   try {
//     const { serviceId, customerName, phone, address, date } = req.body;

//     const booking = new Booking({
//       user: req.user._id,
//       service: serviceId,
//       customerName,
//       phone,
//       address,
//       date,
//       status: "pending",
//     });

//     await booking.save();

//     const options = {
//       amount: booking.service.price * 100,
//       currency: "INR",
//       receipt: `receipt_${booking._id}`,
//     };

//     const order = await razor.orders.create(options);

//     res.json({ paymentUrl: `https://checkout.razorpay.com/v1/checkout.js?order_id=${order.id}&booking=${booking._id}` });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Payment initiation failed" });
//   }
// });

// // PAYMENT SUCCESS WEBHOOK

// router.post("/verify", async (req, res) => {
//   try {
//     const { razorpay_payment_id, razorpay_order_id, razorpay_signature, bookingData } = req.body;

//     const body = razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_SECRET)
//       .update(body.toString())
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({ success: false, msg: "Payment Verification Failed!" });
//     }

//     // Save booking into database
//     const booking = await Booking.create({
//       ...bookingData,
//       paymentId: razorpay_payment_id,
//       status: "paid",
//     });

//     const pdfPath = await generateReceiptPDF(booking);
// // await sendEmail(booking.phone + "@gmail.com", pdfPath);
// await sendEmail(booking.email, pdfPath);



//     res.json({ success: true, bookingId: booking._id });

//   } catch (err) {
//     res.status(500).json({ success: false, msg: "Payment verify error" });
//   }
// });


// export default router;


import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import { protect } from "../middleware/authMiddleware.js";
import Booking from "../models/Booking.js";
import Service from "../models/Service.js";
import sendEmail from "../utils/sendEmail.js";
import generateReceiptPDF from "../utils/generateReceiptPDF.js";

const router = express.Router();

// Razorpay Instance
const razor = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

/* ============================
   INITIATE PAYMENT
============================ */
router.post("/initiate", protect, async (req, res) => {
  try {
    const { serviceId, customerName, email, phone, address, date } = req.body;

    // 1️⃣ Fetch service
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // 2️⃣ Create booking
    const booking = await Booking.create({
      user: req.user._id,
      service: service._id,
      customerName,
      email,
      phone,
      address,
      date,
      status: "pending",
    });

    // 3️⃣ Create Razorpay order
    const order = await razor.orders.create({
      amount: service.price * 100,
      currency: "INR",
      receipt: `receipt_${booking._id}`,
    });

    // 4️⃣ Send response
    res.json({
      orderId: order.id,
      amount: order.amount,
      bookingId: booking._id,
      serviceTitle: service.title,
    });

  } catch (err) {
    console.error("Payment initiate error:", err);
    res.status(500).json({
      message: "Payment initiation failed",
      error: err.message,
    });
  }
});

/* ============================
   VERIFY PAYMENT
============================ */
router.post("/verify", async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      bookingId,
    } = req.body;

    // 1️⃣ Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        msg: "Payment verification failed",
      });
    }

    // 2️⃣ Update booking
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        paymentId: razorpay_payment_id,
        status: "paid",
      },
      { new: true }
    ).populate("service");

    // 3️⃣ Generate receipt & email
    const pdfPath = await generateReceiptPDF(booking);
    await sendEmail(booking.email, pdfPath);

    res.json({
      success: true,
      bookingId: booking._id,
    });

  } catch (err) {
    console.error("Payment verify error:", err);
    res.status(500).json({
      success: false,
      msg: "Payment verification error",
    });
  }
});

export default router;

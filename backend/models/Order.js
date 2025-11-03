// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//   customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   merchantId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
//   totalAmount: { type: Number, required: true },
//   paymentStatus: { type: String, enum: ["pending", "completed"], default: "pending" },
//   orderDate: { type: Date, default: Date.now }
// });

// export default mongoose.model("Order", orderSchema);






import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  merchant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Completed", "Cancelled"],
    default: "Pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Order", orderSchema);

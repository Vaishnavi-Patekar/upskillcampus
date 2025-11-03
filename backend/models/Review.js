// import mongoose from "mongoose";

// const reviewSchema = new mongoose.Schema({
//   customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
//   rating: { type: Number, min: 1, max: 5 },
//   comment: { type: String },
//   createdAt: { type: Date, default: Date.now }
// });

// export default mongoose.model("Review", reviewSchema);



import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Review", reviewSchema);

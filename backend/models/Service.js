// import mongoose from "mongoose";

// const serviceSchema = new mongoose.Schema({
//   merchantId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   name: { type: String, required: true },
//   category: { type: String, enum: ["home", "beauty", "pet", "other"], required: true },
//   description: { type: String },
//   price: { type: Number, required: true },
//   imageUrl: { type: String },
//   createdAt: { type: Date, default: Date.now }
// });

// export default mongoose.model("Service", serviceSchema);


import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    merchant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["home", "beauty", "pet", "automotive", "other"],
      default: "other",
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);

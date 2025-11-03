import express from "express";
import {
  placeOrder,
  getCustomerOrders,
  getMerchantOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, placeOrder);
router.get("/customer", protect, getCustomerOrders);
router.get("/merchant", protect, getMerchantOrders);
router.put("/:id/status", protect, updateOrderStatus);

export default router;

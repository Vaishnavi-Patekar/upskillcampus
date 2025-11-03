import express from "express";
import {
  addReview,
  getServiceReviews,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addReview);
router.get("/:serviceId", getServiceReviews);
router.put("/:id", protect, updateReview);
router.delete("/:id", protect, deleteReview);

export default router;

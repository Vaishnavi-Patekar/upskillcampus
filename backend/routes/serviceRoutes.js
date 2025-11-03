import express from "express";
import {
  createService,
  getMyServices,
  updateService,
  deleteService,
  getAllServices,
} from "../controllers/serviceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createService);          // Create new service
router.get("/myservices", protect, getMyServices); // Merchant's own services
router.put("/:id", protect, updateService);        // Update service
router.delete("/:id", protect, deleteService);     // Delete service
router.get("/", getAllServices);                   // View all services (public)

export default router;

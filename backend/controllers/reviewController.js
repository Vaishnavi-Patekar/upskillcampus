import Review from "../models/Review.js";
import Service from "../models/Service.js";

// Add Review
export const addReview = async (req, res) => {
  try {
    const { serviceId, rating, comment } = req.body;

    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ message: "Service not found" });

    const existingReview = await Review.findOne({ service: serviceId, user: req.user.id });
    if (existingReview)
      return res.status(400).json({ message: "You already reviewed this service" });

    const review = await Review.create({
      service: serviceId,
      user: req.user.id,
      rating,
      comment,
    });

    res.status(201).json({ message: "Review added successfully", review });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all reviews for a service
export const getServiceReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ service: req.params.serviceId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update Review
export const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const review = await Review.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { rating, comment },
      { new: true }
    );

    if (!review) return res.status(404).json({ message: "Review not found or not yours" });

    res.json({ message: "Review updated", review });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete Review
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!review) return res.status(404).json({ message: "Review not found or not yours" });

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

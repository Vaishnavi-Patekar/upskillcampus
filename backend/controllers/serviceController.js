import Service from "../models/Service.js";

// Create a new service
export const createService = async (req, res) => {
  try {
    const { title, description, category, price, image } = req.body;

    const service = await Service.create({
      merchant: req.user._id,
      title,
      description,
      category,
      price,
      image,
    });

    res.status(201).json({ message: "Service created successfully", service });
  } catch (error) {
    res.status(500).json({ message: "Error creating service", error: error.message });
  }
};

// Get all services of a merchant
export const getMyServices = async (req, res) => {
  try {
    const services = await Service.find({ merchant: req.user._id });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Error fetching services", error: error.message });
  }
};

// Update a service
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedService = await Service.findOneAndUpdate(
      { _id: id, merchant: req.user._id },
      req.body,
      { new: true }
    );

    if (!updatedService) return res.status(404).json({ message: "Service not found" });

    res.status(200).json({ message: "Service updated", updatedService });
  } catch (error) {
    res.status(500).json({ message: "Error updating service", error: error.message });
  }
};

// Delete a service
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Service.findOneAndDelete({ _id: id, merchant: req.user._id });

    if (!deleted) return res.status(404).json({ message: "Service not found" });

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting service", error: error.message });
  }
};

// Get all services (for customers)
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().populate("merchant", "name email");
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all services", error: error.message });
  }
};

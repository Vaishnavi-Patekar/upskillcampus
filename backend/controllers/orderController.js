import Order from "../models/Order.js";
import Service from "../models/Service.js";

// Place Order
export const placeOrder = async (req, res) => {
  try {
    const { serviceId } = req.body;
    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ message: "Service not found" });

    const newOrder = await Order.create({
      service: serviceId,
      customer: req.user.id,
      merchant: service.merchant,
      totalPrice: service.price,
    });

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Customer Orders
export const getCustomerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user.id })
      .populate("service", "title price")
      .populate("merchant", "name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Merchant Orders
export const getMerchantOrders = async (req, res) => {
  try {
    const orders = await Order.find({ merchant: req.user.id })
      .populate("service", "title price")
      .populate("customer", "name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update Order Status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

import { useEffect, useState } from "react";
import API from "../api/api";
import "../styles/customer.css";

export default function CustomerDashboard({ user }) {
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchAllServices();
  }, []);

  // Fetch all services
  const fetchAllServices = async () => {
    try {
      const res = await API.get("/services/");
      setServices(res.data);
    } catch (err) {
      console.error("Error loading services:", err);
    }
  };

  // Fetch services by category
  const fetchCategoryServices = async (category) => {
    if (category === "all") {
      fetchAllServices();
      return;
    }

    try {
      const res = await API.get(`/services/category/${category}`);
      setServices(res.data);
    } catch (err) {
      console.error("Category load error:", err);
    }
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    fetchCategoryServices(category);
  };

  // Book a service
  const handleBooking = async (serviceId) => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/booking/create",
        { serviceId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("🎉 Booking successful!");
    } catch (err) {
      console.error("Booking error:", err);
      alert("❌ Booking failed.");
    }
  };

  return (
    <div className="customer-dashboard">
      <h2>Welcome, {user?.name} 👋</h2>

      {/* Category Filter */}
      <div className="filter-section">
        <label>Filter by Category:</label>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="all">All</option>
          <option value="home">Home</option>
          <option value="beauty">Beauty</option>
          <option value="pet">Pet</option>
          <option value="automotive">Automotive</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Services Grid */}
      <div className="services-grid">
        {services.length === 0 ? (
          <p>No services found.</p>
        ) : (
          services.map((s) => (
            <div className="service-card" key={s._id}>
              <img
                src={s.image || "https://via.placeholder.com/150"}
                alt={s.title}
                className="service-img"
              />

              <h4>{s.title}</h4>
              <p>{s.description}</p>
              <p className="price">₹{s.price}</p>
              <p className="category">Category: {s.category}</p>

              <button onClick={() => handleBooking(s._id)}>
                Book Now
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

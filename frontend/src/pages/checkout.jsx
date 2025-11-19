import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/api";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const service = location.state?.service;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  if (!service) return <h2>No service selected</h2>;

  const handleCheckout = async () => {
    try {
      setLoading(true);

      const res = await API.post("/booking/initiate", {
        serviceId: service._id,
        customerName: name,
        phone,
        address,
        date,
      });

      window.location.href = res.data.paymentUrl; // Razorpay checkout URL
    } catch (err) {
      alert("Payment initiation failed");
    }
  };

  return (
    <div className="checkout-page">
      <h2>Booking: {service.title}</h2>
      <p>Price: ₹{service.price}</p>

      <input placeholder="Full Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Phone Number" onChange={(e) => setPhone(e.target.value)} />
      <textarea placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
      <input type="date" onChange={(e) => setDate(e.target.value)} />

      <button disabled={loading} onClick={handleCheckout}>
        {loading ? "Processing..." : "Proceed to Payment"}
      </button>
    </div>
  );
}

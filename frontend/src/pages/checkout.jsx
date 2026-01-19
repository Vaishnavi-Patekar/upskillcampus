import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/api";
import "../styles/checkout.css";
export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const service = location.state?.service;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
API.post("/booking/initiate")

  if (!service) return <h2>No service selected</h2>;

//   const handleCheckout = async () => {
//     try {
//       setLoading(true);

//       const res = await API.post("/booking/initiate", {
//         serviceId: service._id,
//         customerName: name,
//         phone,
//         address,
//         date,
//         time,
//       });

//       window.location.href = res.data.paymentUrl; // Razorpay checkout URL
//     } catch (err) {
//       alert("Payment initiation failed");
//     }
//   };

  const handleCheckout = async () => {
  const res = await API.post("/booking/initiate", { serviceId: service._id });

  const options = {
    key: res.data.key,
    amount: res.data.amount,
    currency: "INR",
    name: "Service Booking",
    description: "Complete Your Booking",
    order_id: res.data.orderId,

    handler: async function (response) {
      await API.post("/payment/verify", {
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature,
        bookingData: {
          serviceId: service._id,
          customerName: name,
          phone,
          address,
          date,
          time,
        },
      });

      alert("Payment Successful!");
      navigate("/receipt");
    },
  };

  const razor = new window.Razorpay(options);
  razor.open();
};


  return (
    <div className="checkout-page">
      <h2>Booking: {service.title}</h2>
      <p>Price: ₹{service.price}</p>

      <input placeholder="Full Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Phone Number" onChange={(e) => setPhone(e.target.value)} />
      <textarea placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
      <input type="date" onChange={(e) => setDate(e.target.value)} />
      <input type="time" onChange={(e) => setTime(e.target.value)} />
      <button disabled={loading} onClick={handleCheckout}>
        {loading ? "Processing..." : "Proceed to Payment"}
      </button>
    </div>
  );
}

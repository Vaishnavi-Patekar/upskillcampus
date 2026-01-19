import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom"; 
import "./../styles/cartpage.css";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const res = await API.get("/cart");
    setCart(res.data?.items ?? []);
  };

  const removeItem = async (serviceId) => {
    await API.delete(`/cart/remove/${serviceId}`);
    loadCart();
  };

  const buySingle = (service) => {
    navigate("/checkout", { state: { buyType: "single", item: service } });
  };

  const buyAll = () => {
    navigate("/checkout", { state: { buyType: "all", items: cart } });
  };

  return (
    <div className="cart-page">
      <h2>Your Cart 🛒</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {/* Buy All Button */}
          <button className="buy-all-btn" onClick={buyAll}>
            Book All ({cart.length} items)
          </button>

          {cart.map((item) => (
            <div className="cart-item" key={item.service._id}>
              <h4>{item.service.title}</h4>
              <p>Price: ₹{item.service.price}</p>
              <p>Quantity: {item.quantity}</p>

              <div className="cart-actions">
                <button
                  className="buy-btn"
                  onClick={() => buySingle(item.service)}
                >
                  Book Now
                </button>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.service._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

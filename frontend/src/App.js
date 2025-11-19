import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Register from "./pages/register";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import CustomerDashboard from "./pages/customerdashboard";
import Navbar from "./components/Navbar";
import CartPage from "./pages/cartpage";
import CheckOut from "./pages/checkout";


function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  return (
    <Router>
      {/* Navbar always visible */}
      <Navbar user={user} setUser={setUser} />

      <div style={{ marginTop: "90px" }}>
        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />

          {/* Merchant Dashboard */}
          <Route path="/merchant-dashboard" element={<Dashboard user={user} />} />

          {/* Customer Dashboard */}
          <Route path="/customer-dashboard" element={<CustomerDashboard user={user} />} />

          <Route path="/cart" element={<CartPage />} />

           <Route path="/checkout" element={<CheckOut />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;

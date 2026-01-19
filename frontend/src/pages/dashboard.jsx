import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import MerchantDashboard from "./merchantdashboard";
import "./../styles/dashboard.css";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await API.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) return <p>Loading dashboard...</p>;

  // ✅ Role-based rendering
  if (user.role === "merchant") {
    return (
      <div>
        <MerchantDashboard user={user} />
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    );
  }

  // ✅ For Customers
  if (user.role === "customer") {
    return (
      <div className="dashboard">
        <h2>Welcome, {user.name}!</h2>
        <h3>🛍️ Customer Dashboard</h3>
        <p>You can browse available services and book appointments here.</p>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    );
  }

  // ✅ Default fallback
  return (
    <div className="dashboard">
      <h2>Welcome, {user.name}!</h2>
      <p>Role not recognized.</p>
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
}

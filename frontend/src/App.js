import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Register from "./pages/register";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import CustomerDashboard from "./pages/customerdashboard";

function App() {
  // ✅ user must be inside App component
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  return (
    <Router>
      <Routes>
        {/* Pass setUser so Login can update user state */}
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />

        <Route path="/register" element={<Register />} />

        {/* Dashboard receives user */}
        <Route path="/dashboard" element={<Dashboard user={user} />} />

        {/* Customer Dashboard only accessible for customers */}
        <Route 
          path="/customer-dashboard" 
          element={<CustomerDashboard user={user} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;

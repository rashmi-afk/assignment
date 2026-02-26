import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h2>Welcome, {user.name}!</h2>
      <p>Role: {user.role}</p>
      {user.role === "admin" && <p>This is the admin dashboard.</p>}
      {user.role === "employee" && <p>This is the employee dashboard.</p>}
      <button onClick={handleLogout} style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}>Logout</button>
    </div>
  );
};

export default DashboardPage;
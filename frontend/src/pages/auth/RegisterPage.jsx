import React, { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import "./auth.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "employee" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/auth/register", formData);
      setMessage("Registered successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500); // redirect after 1.5 sec
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h2>Register</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
          <NavLink to="/login" className="nav-link">
            <button type="submit">Register</button>
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

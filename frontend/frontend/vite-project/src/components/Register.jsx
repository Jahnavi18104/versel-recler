import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import Logo from "../assets/F_Logo.png";
import Img from "../assets/register.jpg";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.rePassword) {
      setMessage("Passwords do not match.");
      setIsError(true);
      return;
    }

    try {
      const response = await fetch("https://versel-recler-8.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("✅ Registration successful! Redirecting...");
        setIsError(false);
        setTimeout(() => {
          window.location.href = "/signin";
        }, 2000);
      } else {
        setMessage(data.message);
        setIsError(true);
      }
    } catch (err) {
      setMessage("❌ Error connecting to the server.");
      setIsError(true);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box image-box">
        <img src={Img} alt="Register" className="register-image" />
      </div>
      <div className="register-box form-box">
        <img src={Logo} alt="Logo" className="logo" />
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Enter name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Enter password" value={formData.password} onChange={handleChange} required />
          <input type="password" name="rePassword" placeholder="Re-enter password" value={formData.rePassword} onChange={handleChange} required />
          <button type="submit">Submit</button>
        </form>
        <p className={isError ? "error-message" : "success-message"}>{message}</p>
        <p>
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

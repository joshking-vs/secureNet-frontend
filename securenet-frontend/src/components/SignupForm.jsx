// src/components/SignupForm.jsx
import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { getCSRFToken } from "../utils/csrf";
import { toast } from "react-toastify";

const SignupForm = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // Automatically fetch CSRF token on component mount
    getCSRFToken()
      .then(() => console.log("✅ CSRF token retrieved."))
      .catch(() => toast.error("❌ Could not get CSRF token."));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("auth/signup/", form);
      setMessage(response.data.message || "Signup successful!");
      toast.success("✅ Signup successful!");
      console.log(response.data);
    } catch (err) {
      setMessage("Signup failed.");
      toast.error("❌ Signup failed!");
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default SignupForm;


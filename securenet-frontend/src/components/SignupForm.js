import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { getCSRFToken } from "../utils/csrf";
import { toast } from "react-toastify";

const SignupForm = ({ onAuth }) => {
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
      if (onAuth) onAuth();
    } catch (err) {
      setMessage("Signup failed.");
      toast.error("❌ Signup failed!");
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Sign Up</h2>
      <input className="form-control rounded-5" type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
      <input className="form-control" type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input className="form-control" type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
      <button type="submit" className="btn btn-success">Sign Up</button>
      <p className="text-center text-muted">{message}</p>
    </form>
  );
};

export default SignupForm;
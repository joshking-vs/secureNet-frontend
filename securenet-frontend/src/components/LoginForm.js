import React, { useState } from 'react';
import api from '../api/axios';
import { getCSRFToken } from '../utils/csrf';

function LoginForm({ onAuth }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await getCSRFToken();

    try {
      const response = await api.post('auth/login/', form);
      setMessage('Login successful!');
      onAuth();
    } catch (err) {
      setMessage('Login failed.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Login</h2>
      <input className="form-control" name="username" placeholder="Username" onChange={handleChange} required />
      <input className="form-control" name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit" className="btn btn-primary">Login</button>
      <p className="text-center text-muted">{message}</p>
    </form>
  );
}

export default LoginForm;
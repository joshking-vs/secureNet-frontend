
import React, { useState } from 'react';
import api from '../api/axios';
import { getCSRFToken } from '../utils/csrf';

function LoginForm() {
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
    } catch (err) {
      setMessage('Login failed.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input name="username" placeholder="Username" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Login</button>
      <p>{message}</p>
    </form>
  );
}

export default LoginForm;

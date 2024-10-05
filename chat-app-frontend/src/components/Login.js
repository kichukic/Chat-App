// src/components/Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Check if token exists in sessionStorage
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      // If token exists, redirect to chat
      navigate('/rooms');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);

        // Save token and refresh_token in sessionStorage
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('refresh_token', data.refresh_token);

        // Redirect to chat room after successful login
        navigate('/rooms');
      } else {
        console.error('Login failed');
        alert(data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-title">Login</div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;

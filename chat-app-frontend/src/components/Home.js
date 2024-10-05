// src/components/Home.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  // Check if token exists in sessionStorage
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      // If no token exists, redirect to login page
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.clear(); // Clear session storage
    navigate('/'); // Redirect to login
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>You are now logged in!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;

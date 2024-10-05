// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ChatRoom from './components/ChatRoom'; // Import ChatRoom
import './App.css';
import RoomsPage from './components/room';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />       {/* Login page */}
          <Route path="/register" element={<Register />} />  {/* Registration page */}
          <Route path="/chat" element={<ChatRoom />} />     {/* Chat room after login */}
          <Route path="/rooms" element ={<RoomsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const [showLogin, setShowLogin] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleCardClick = (role) => {
    setRole(role);
    setShowLogin(true); // Show login form when role is clicked
  };

  const handleCloseLogin = () => {
    setShowLogin(false); // Close the login card when clicked
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (role === 'receptionist') {
      if (userId === 'recp_1845' && password === '1845') {
        navigate('/receptionist'); // Redirect to Receptionist dashboard
      } else {
        alert('Invalid credentials for Receptionist');
      }
    } else if (role === 'doctor') {
      if (userId === 'doct_1845' && password === '1845') {
        navigate('/doctor'); // Redirect to Doctor dashboard
      } else {
        alert('Invalid credentials for Doctor');
      }
    } else {
      alert('Invalid role selected');
    }
  };

  return (
    <div className="home-page">
      <nav className="navbar">
        <h1>Apollo Hospital</h1>
      </nav>
      
      <div className="card-container">
        <div className="card" onClick={() => handleCardClick('receptionist')}>
          <h2>Receptionist</h2>
          <p>Manage patients and appointments.</p>
        </div>
        <div className="card" onClick={() => handleCardClick('doctor')}>
          <h2>Doctor</h2>
          <p>View patient details and grant appointments.</p>
        </div>
      </div>

      {showLogin && (
        <div className="login-card">
          <button className="close-btn" onClick={handleCloseLogin}>
            &times;
          </button>
          <h2>Authentication</h2>
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="text"
              placeholder="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              className="form-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
            <button type="submit" className="btn-login">Login</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default HomePage;

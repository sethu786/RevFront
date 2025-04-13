import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css'; // Assuming you have a separate CSS file for styles

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwt_token'); // Clear the JWT token from local storage
    navigate('/login'); // Navigate to the login page
  };

  const goToDashboard = () => {
    navigate('/dashboard'); // Navigate to the dashboard when clicked
  };

  return (
    <header className="header">
      <div className="header-content">
        <button className="nav-btn" onClick={goToDashboard}>
          Admin Panel
        </button>
        <button className="nav-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;

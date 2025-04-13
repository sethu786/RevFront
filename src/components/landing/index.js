import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

class LandingPage extends Component {
  render() {
    return (
      <div className="landing-container">
        <h2>Welcome to the Admin Panel</h2>
        <p>Please choose an action:</p>
        <div className="button-container">
          <Link to="/login" className="landing-btn">
            Login
          </Link>
          <Link to="/signup" className="landing-btn">
            Sign Up
          </Link>
        </div>
      </div>
    );
  }
}

export default LandingPage;

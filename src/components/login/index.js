import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  // Check if the user is already logged in when the component mounts
  useEffect(() => {
    if (localStorage.getItem('jwt_token')) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const contentType = res.headers.get('content-type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        const text = await res.text();
        data = { message: text };
      }

      if (res.ok) {
        if (data.jwtToken) {
          localStorage.setItem('jwt_token', data.jwtToken);
          navigate('/dashboard', { replace: true });
        } else {
          throw new Error('Invalid response from server');
        }
      } else {
        throw new Error(data.error || data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err.message);
      setErrorMsg(err.message || 'Network error, please try again.');
    }
  };

  // Navigate to the Signup page
  const navigateToSignup = () => {
    navigate('/signup', { replace: true });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={onSubmitLogin}>
        <h2>Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {errorMsg && <p className="error-msg">{errorMsg}</p>}
      </form>

      <button className="signup-btn" onClick={navigateToSignup}>
        Don't have an account? Sign Up
      </button>
    </div>
  );
};

export default Login;

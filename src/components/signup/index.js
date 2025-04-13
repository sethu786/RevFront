import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './index.css';

const Signup = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    gender: 'Male',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  // 1️⃣ If already logged in, send straight to dashboard
  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (form.password !== form.confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
          name: form.name,
          gender: form.gender,
        }),
      });

      // Handle JSON or plain-text
      const contentType = res.headers.get('content-type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        const text = await res.text();
        data = { message: text };
      }

      if (!res.ok) {
        throw new Error(data.error || data.message || 'Signup failed');
      }

      // 2️⃣ On successful signup, go to login
      navigate('/login', { replace: true });
    } catch (err) {
      setErrorMsg(err.message || 'Network error, please try again.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={onSubmit} className="login-form">
        <h2>Sign Up</h2>
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={onChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={onChange}
          required
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={onChange}
          required
        />
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={onChange}
          required
        />
        <select name="gender" value={form.gender} onChange={onChange}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit">Sign Up</button>
        {errorMsg && <p className="error-msg">{errorMsg}</p>}

        {/* 3️⃣ Link to login for existing users */}
        <p className="toggle-text">
          Already have an account?{' '}
          <Link to="/login" className="login-link">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;

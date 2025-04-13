import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import Dashboard from './components/dashboard';
import AddCategory from './components/addCategory';
import EditCategory from './components/editCategory';
import LandingPage from './components/landing';
import { isAuthenticated } from './utils/auth';

const App = () => (
  <BrowserRouter>
    <Routes>
      {/* Initial landing page with options to login or signup */}
      <Route path="/" element={<LandingPage />} />

      {/* Login and Signup routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected routes - accessible only if authenticated */}
      <Route
        path="/dashboard"
        element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/add-category"
        element={isAuthenticated() ? <AddCategory /> : <Navigate to="/login" />}
      />
      <Route
        path="/edit-category/:id"
        element={isAuthenticated() ? <EditCategory /> : <Navigate to="/login" />}
      />

      {/* Redirect any non-matching routes to login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  </BrowserRouter>
);

export default App;

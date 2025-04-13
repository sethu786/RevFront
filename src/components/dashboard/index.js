import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import Header from '../header';
import './index.css';

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  
  const navigate = useNavigate(); // useNavigate hook

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/categories', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCategories(data);
          setLoading(false);
        } else {
          setErrorMsg('Failed to fetch categories');
          setLoading(false);
        }
      } catch (error) {
        setErrorMsg('Error fetching categories');
        setLoading(false);
      }
    };

    fetchCategories();
  }, [navigate]);

  const onLogout = () => {
    localStorage.removeItem('jwt_token');
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <div className="dashboard-container">
        <Header/>

      <h2>Dashboard</h2>
      {loading ? (
        <p>Loading...</p>
      ) : errorMsg ? (
        <p className="error-msg">{errorMsg}</p>
      ) : (
        <>
          <Link to="/add-category" className="add-category-btn">
            + Add Category
          </Link>
          <div className="category-grid">
            {categories.map((category) => (
              <div className="category-card" key={category.id}>
                <img
                  src={category.image_url || 'https://via.placeholder.com/150'}
                  alt={category.name}
                  className="category-img"
                />
                <div className="category-info">
                  <h3>{category.name}</h3>
                  <p>{category.item_count} items</p>
                  <Link
                    to={`/edit-category/${category.id}`}
                    className="edit-category-btn"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;

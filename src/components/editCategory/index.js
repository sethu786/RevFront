import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../header';
import './index.css';

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState({
    name: '',
    item_count: '',
    image_url: ''
  });
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchCategory = async () => {
      try {
        const response = await fetch(`https://revback-4.onrender.com/api/categories/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setCategory(data);
        } else {
          setErrorMsg('Unable to fetch category');
        }
      } catch (error) {
        setErrorMsg('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: name === 'item_count' ? parseInt(value, 10) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, item_count, image_url } = category;

    if (!name || !item_count || !image_url) {
      setErrorMsg('All fields are required');
      return;
    }

    const token = localStorage.getItem('jwt_token');
    if (!token) {
      navigate('/login');
      return;
    }

    const response = await fetch(`http://localhost:3000/api/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    });

    if (response.ok) {
      navigate('/dashboard');
    } else {
      setErrorMsg('Error updating category');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="edit-category-container">
      <Header />
      <h2>Edit Category</h2>
      <form className="edit-category-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Category Name"
          value={category.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="item_count"
          placeholder="Item Count"
          value={category.item_count}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image_url"
          placeholder="Image URL"
          value={category.image_url}
          onChange={handleChange}
          required
        />

        {category.image_url && (
          <img
            src={category.image_url}
            alt="Preview"
            style={{ width: '200px', marginBottom: '10px' }}
          />
        )}

        <button type="submit">Update Category</button>
        {errorMsg && <p className="error-msg">{errorMsg}</p>}
      </form>
    </div>
  );
};

export default EditCategory;

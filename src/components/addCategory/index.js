import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header';
import './index.css';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [item_count, setItemCount] = useState(0);
  const [image_url, setImageUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate(); // useNavigate hook

  const onChangeName = (e) => setName(e.target.value);
  const onChangeItemCount = (e) => setItemCount(e.target.value);
  const onChangeImage = (e) => setImageUrl(e.target.value);

  const onSubmitCategory = async (e) => {
    e.preventDefault();

    if (!name || !item_count || !image_url) {
      setErrorMsg('All fields are required!');
      return;
    }

    const categoryDetails = { name, item_count, image_url };

    const token = localStorage.getItem('jwt_token');
    if (!token) {
      navigate('/login'); // Navigate to login page if token is missing
      return;
    }

    const response = await fetch('http://localhost:3000/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(categoryDetails),
    });

    if (response.ok) {
      navigate('/dashboard'); // Navigate to dashboard on success
    } else {
      setErrorMsg('Error adding category');
    }
  };

  return (
    <div className="add-category-container">
                <Header/>
        
      <h2>Add New Category</h2>
      <form onSubmit={onSubmitCategory} className="add-category-form">
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={onChangeName}
          required
        />
        <input
          type="number"
          placeholder="Item Count"
          value={item_count}
          onChange={onChangeItemCount}
          required
        />
        <input
          type="text"
          placeholder="Category Image URL"
          value={image_url}
          onChange={onChangeImage}
          required
        />
        <button type="submit">Add Category</button>
        {errorMsg && <p className="error-msg">{errorMsg}</p>}
      </form>
    </div>
  );
};

export default AddCategory;

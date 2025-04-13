// src/components/categories/index.js
import React, { Component } from 'react';
import Header  from '../header';
import './index.css';

class CategoriesList extends Component {
  state = {
    categories: [],
  };

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    const jwtToken = localStorage.getItem('jwt_token');
    const response = await fetch('http://localhost:3000/api/categories', {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      this.setState({ categories: data });
    } else {
      console.error('Failed to fetch categories');
    }
  };

  render() {
    const { categories } = this.state;
    return (
      <div className="category-list">
        {categories.map((category) => (
          <div className="category-card" key={category.id}>
            <img src={category.image_url} alt={category.name} className="category-image" />
            <div className="category-details">
              <h3>{category.name}</h3>
              <p>{category.item_count} items</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default CategoriesList;

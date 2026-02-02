import React, { useState } from 'react';
import axios from 'axios';

const AddCategory = () => {
  const [categoryData, setCategoryData] = useState({
    title: '',
    description: '',
  });

  const handleChange = (e) => {
    setCategoryData({
      ...categoryData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8080/api/category/add',
        categoryData
      );

      console.log('Category Saved:', response.data);
      alert('Job Category added successfully!');
      setCategoryData({ title: '', description: '' });
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Failed to add category');
    }
  };

  return (
    <>
      {/* Responsive CSS */}
      <style>{`
        * { box-sizing: border-box; }
        @media (max-width: 768px) {
          .add-category-container { padding: 20px !important; margin: 20px auto !important; }
          .add-category-container input,
          .add-category-container textarea { padding: 10px !important; font-size: 14px !important; }
          .add-category-container button { padding: 8px 20px !important; font-size: 14px !important; }
        }
        @media (max-width: 480px) {
          .add-category-container { padding: 12px !important; margin: 15px auto !important; }
          .add-category-container textarea { height: 80px !important; }
        }
      `}</style>

      <div
        className="add-category-container"
        style={{
          maxWidth: '500px',
          margin: '40px auto',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
          backgroundColor: '#FFF9E6',
          fontFamily: 'Arial, sans-serif',
          border: '1px solid #ff69b4',
          overflowX: 'hidden', // prevent horizontal overflow
        }}
      >
        <div
          style={{
            backgroundColor: '#ff69b4',
            color: 'white',
            padding: '12px',
            textAlign: 'center',
            borderRadius: '6px',
            marginBottom: '25px',
            fontWeight: 'bold',
            fontSize: '18px',
          }}
        >
          Add Job Category
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#444' }}>
              Category Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter category title"
              value={categoryData.title}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#444' }}>
              Category Description
            </label>
            <textarea
              name="description"
              placeholder="Enter category description"
              value={categoryData.description}
              onChange={handleChange}
              style={{ ...inputStyle, height: '100px', resize: 'none' }}
              required
            />
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              type="submit"
              style={{
                backgroundColor: '#ff69b4',
                color: 'white',
                border: 'none',
                padding: '10px 25px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
              }}
            >
              Add Job Category
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const inputStyle = {
  width: '100%',
  padding: '14px',
  border: '1px solid #ff69b4',
  borderRadius: '6px',
  fontSize: '15px',
  outline: 'none',
};

export default AddCategory;

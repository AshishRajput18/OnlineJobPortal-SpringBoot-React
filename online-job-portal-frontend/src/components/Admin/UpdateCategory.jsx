import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();   // get id from URL

  const [categoryData, setCategoryData] = useState({
    title: '',
    description: '',
  });

  // LOAD CATEGORY FROM BACKEND
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/category/${id}`
        );

        setCategoryData({
          title: res.data.title,
          description: res.data.description,
        });
      } catch (error) {
        console.error('Error fetching category', error);
        alert('Category not found');
      }
    };

    fetchCategory();
  }, [id]);

  const handleChange = (e) => {
    setCategoryData({
      ...categoryData,
      [e.target.name]: e.target.value,
    });
  };

  // UPDATE CATEGORY
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:8080/api/category/update/${id}`,
        categoryData
      );

      alert('Category Updated Successfully');
      navigate('/all-categories');
    } catch (error) {
      console.error('Update failed', error);
      alert('Update Failed');
    }
  };

  return (
    <>
      {/* Mobile Responsive CSS */}
      <style>{`
        * { box-sizing: border-box; }
        @media (max-width: 768px) {
          .update-category-container { padding: 20px !important; margin: 20px auto !important; }
          .update-category-container input,
          .update-category-container textarea { padding: 10px !important; font-size: 14px !important; }
          .update-category-container button { padding: 8px 20px !important; font-size: 14px !important; }
        }
        @media (max-width: 480px) {
          .update-category-container { padding: 12px !important; margin: 15px auto !important; }
        }
      `}</style>

      <div className="update-category-container" style={containerStyle}>
        <div style={headerStyle}>Update Job Category</div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '18px' }}>
            <label style={labelStyle}>Category Title</label>
            <input
              type="text"
              name="title"
              value={categoryData.title}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Category Description</label>
            <textarea
              name="description"
              value={categoryData.description}
              onChange={handleChange}
              style={{ ...inputStyle, height: '100px', resize: 'none' }}
              required
            />
          </div>

          <div style={{ textAlign: 'center' }}>
            <button type="submit" style={buttonStyle}>
              Update Category
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

/* ---------- Styles ---------- */

const containerStyle = {
  maxWidth: '500px',
  margin: '40px auto',
  padding: '30px',
  borderRadius: '12px',
  boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
  backgroundColor: '#FFF9E6',
  border: '1px solid #ff69b4',
  overflowX: 'hidden', // prevents horizontal overflow on small screens
};

const headerStyle = {
  backgroundColor: '#ff69b4',
  color: 'white',
  padding: '12px',
  textAlign: 'center',
  borderRadius: '6px',
  marginBottom: '25px',
  fontWeight: 'bold',
};

const labelStyle = {
  display: 'block',
  marginBottom: '6px',
  fontWeight: '500',
};

const inputStyle = {
  width: '100%',
  padding: '14px',
  border: '1px solid #ff69b4',
  borderRadius: '6px',
  outline: 'none',
};

const buttonStyle = {
  backgroundColor: '#ff69b4',
  color: 'white',
  border: 'none',
  padding: '10px 25px',
  borderRadius: '6px',
  cursor: 'pointer',
};

export default UpdateCategory;

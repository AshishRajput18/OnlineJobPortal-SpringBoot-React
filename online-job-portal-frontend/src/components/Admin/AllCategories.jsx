import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AllCategories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  // FETCH ALL CATEGORIES
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/category/all');
      setCategories(res.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // UPDATE
  const handleUpdate = (id) => {
    navigate(`/update-category/${id}`);
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/category/delete/${id}`);
      alert('Category deleted');
      fetchCategories(); // refresh list
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete');
    }
  };

  return (
    <>
      {/* Responsive CSS */}
      <style>{`
        * { box-sizing: border-box; }
        .categories-container { overflow-x: hidden; }
        .categories-table-wrapper {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .categories-table { min-width: 600px; }
        @media (max-width: 768px) {
          .categories-container { padding: 20px !important; }
          .categories-title { font-size: 16px !important; padding: 10px !important; }
          .categories-table th,
          .categories-table td { padding: 6px 8px !important; font-size: 12px; }
          .categories-table button { padding: 6px 12px !important; font-size: 12px; }
        }
        @media (max-width: 480px) {
          .categories-container { padding: 12px !important; margin: 20px auto !important; }
        }
      `}</style>

      <div style={containerStyle} className="categories-container">
        <div style={titleStyle} className="categories-title">All Job Categories</div>

        <div className="categories-table-wrapper">
          <table style={tableStyle} className="categories-table">
            <thead>
              <tr style={headerRowStyle}>
                <th style={headerCellStyle}>Category Id</th>
                <th style={headerCellStyle}>Category</th>
                <th style={headerCellStyle}>Description</th>
                <th style={headerCellStyle}>Action</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} style={rowStyle}>
                  <td style={cellStyle}>{cat.id}</td>
                  <td style={cellStyle}>{cat.title}</td>
                  <td style={cellStyle}>{cat.description}</td>
                  <td style={cellStyle}>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => handleUpdate(cat.id)}
                        style={updateButtonStyle}
                      >
                        Update
                      </button>

                      <button
                        onClick={() => handleDelete(cat.id)}
                        style={deleteButtonStyle}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const containerStyle = {
  maxWidth: '800px',
  margin: '40px auto',
  padding: '30px',
  borderRadius: '12px',
  boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
  backgroundColor: '#FFF9E6',
  border: '1px solid #ff69b4',
};

const titleStyle = {
  backgroundColor: '#ff69b4',
  color: 'white',
  padding: '12px',
  textAlign: 'center',
  borderRadius: '6px',
  marginBottom: '25px',
  fontWeight: 'bold',
  fontSize: '18px',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: '#FFF9E6',
};

const headerRowStyle = {
  backgroundColor: '#ff69b4',
  color: 'white',
};

const headerCellStyle = {
  padding: '12px',
  textAlign: 'left',
};

const rowStyle = {
  borderBottom: '1px solid #ff69b4',
};

const cellStyle = {
  padding: '12px',
};

const updateButtonStyle = {
  backgroundColor: '#ff69b4',
  color: 'white',
  border: 'none',
  padding: '8px 20px',
  borderRadius: '6px',
  cursor: 'pointer',
};

const deleteButtonStyle = {
  backgroundColor: 'transparent',
  color: '#ff69b4',
  border: '1px solid #ff69b4',
  padding: '8px 20px',
  borderRadius: '6px',
  cursor: 'pointer',
};

export default AllCategories;

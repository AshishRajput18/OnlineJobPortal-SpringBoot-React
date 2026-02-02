import React, { useState } from 'react';
import axios from 'axios';   // IMPORTANT

const RegisterAdmin = () => {
  const [adminData, setAdminData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setAdminData({
      ...adminData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/register/admin`,
        adminData
      );

      alert(response.data || 'Admin Registered Successfully');

      // set role after backend success
      localStorage.setItem('role', 'admin');

      // redirect or reload header
      window.location.href = '/';
    } catch (error) {
      console.error(error);
      alert('Admin Registration Failed');
    }
  };

  return (
    <>
      {/* Responsive CSS */}
      <style>{`
        * { box-sizing: border-box; }
        @media (max-width: 768px) {
          .register-admin-container { padding: 20px !important; margin: 20px auto !important; }
          .register-admin-container input { padding: 10px !important; font-size: 14px !important; }
          .register-admin-container button { padding: 8px 20px !important; font-size: 14px !important; }
        }
        @media (max-width: 480px) {
          .register-admin-container { padding: 12px !important; margin: 15px auto !important; }
        }
      `}</style>

      <div
        className="register-admin-container"
        style={{
          maxWidth: '500px',
          margin: '40px auto',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
          backgroundColor: '#FFF9E6',
          fontFamily: 'Arial, sans-serif',
          border: '1px solid #ff69b4',
          overflowX: 'hidden', // prevents horizontal overflow
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
          Register Admin
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ marginBottom: '18px' }}>
            <label
              htmlFor="email"
              style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#444' }}
            >
              Email Id
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              value={adminData.email}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: '20px' }}>
            <label
              htmlFor="password"
              style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#444' }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              value={adminData.password}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>

          {/* Submit Button */}
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
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#e055a3')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#ff69b4')}
            >
              Register Admin
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

export default RegisterAdmin;

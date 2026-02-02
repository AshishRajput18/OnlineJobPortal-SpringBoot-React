import React, { useState } from 'react';
import axios from 'axios'; // ✅ Import axios

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    contactNo: '',
    street: '',
    city: '',
    state: '',
    pin: '',
    country: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/register/employee`, // ✅ Correct endpoint
        formData
      );
      alert('Employee Registered Successfully');

      // Optional: Clear the form after successful registration
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        contactNo: '',
        street: '',
        city: '',
        state: '',
        pin: '',
        country: ''
      });
    } catch (error) {
      console.error('Registration Error:', error);
      alert('Registration Failed');
    }
  };

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '40px auto',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
        backgroundColor: '#FFF9E6',
        fontFamily: 'Arial, sans-serif',
        border: '1px solid #ff69b4',
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
        Register here!!
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {/* NAME */}
        <div style={flexContainerStyle}>
          <div style={flexItemStyle}>
            <label>First Name</label>
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} style={inputStyle} required />
          </div>
          <div style={flexItemStyle}>
            <label>Last Name</label>
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} style={inputStyle} required />
          </div>
        </div>

        {/* EMAIL & PASSWORD */}
        <div style={flexContainerStyle}>
          <div style={flexItemStyle}>
            <label>Email</label>
            <input type="email" name="email" placeholder="Email Id" value={formData.email} onChange={handleChange} style={inputStyle} required />
          </div>
          <div style={flexItemStyle}>
            <label>Password</label>
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} style={inputStyle} required />
          </div>
        </div>

        {/* CONTACT & STREET */}
        <div style={flexContainerStyle}>
          <div style={flexItemStyle}>
            <label>Contact No</label>
            <input type="tel" name="contactNo" placeholder="Contact No" value={formData.contactNo} onChange={handleChange} style={inputStyle} required />
          </div>
          <div style={flexItemStyle}>
            <label>Street</label>
            <input type="text" name="street" placeholder="Street" value={formData.street} onChange={handleChange} style={inputStyle} required />
          </div>
        </div>

        {/* CITY & STATE */}
        <div style={flexContainerStyle}>
          <div style={flexItemStyle}>
            <label>City</label>
            <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} style={inputStyle} required />
          </div>
          <div style={flexItemStyle}>
            <label>State</label>
            <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} style={inputStyle} required />
          </div>
        </div>

        {/* PIN & COUNTRY */}
        <div style={flexContainerStyle}>
          <div style={flexItemStyle}>
            <label>Pin</label>
            <input type="text" name="pin" placeholder="Pin" value={formData.pin} onChange={handleChange} style={inputStyle} required />
          </div>
          <div style={flexItemStyle}>
            <label>Country</label>
            <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} style={inputStyle} required />
          </div>
        </div>

        {/* SUBMIT */}
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
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#e055a3')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#ff69b4')}
          >
            Register User
          </button>
        </div>
      </form>
    </div>
  );
};

/* ─── Styles ───────────────────────── */
const flexContainerStyle = {
  display: 'flex',
  gap: '15px',
  flexWrap: 'wrap', // ✅ Mobile responsiveness
};

const flexItemStyle = {
  flex: 1,
  minWidth: '200px', // ✅ Prevent inputs from shrinking too much on mobile
  display: 'flex',
  flexDirection: 'column',
  gap: '5px'
};

const inputStyle = {
  padding: '14px',
  border: '1px solid #ff69b4',
  borderRadius: '6px',
  fontSize: '15px',
  outline: 'none'
};

export default EmployeeForm;

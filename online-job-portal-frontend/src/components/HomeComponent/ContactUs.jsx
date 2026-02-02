import React from 'react';

const ContactUs = () => {
  return (
    <div
      style={{
        maxWidth: '700px',
        margin: '50px auto',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
        backgroundColor: '#FFF9E6',
        fontFamily: 'Arial, sans-serif',
        border: '1px solid #ff69b4'
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
          fontSize: '20px'
        }}
      >
        Contact Us
      </div>

      <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '15px' }}>
        Thank you for using our Online Job Portal. We are here to help both
        job seekers and employers with any queries or support requirements.
      </p>

      <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '10px' }}>
        <strong>Company Name:</strong> Online Job Portal
      </p>

      <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '10px' }}>
        <strong>Email Support:</strong> support@jobportal.com
      </p>

      <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '10px' }}>
        <strong>Phone:</strong> +91 98765 43210
      </p>

      <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '10px' }}>
        <strong>Address:</strong> Ahmedabad, Gujarat, India
      </p>

      <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
        <strong>Working Hours:</strong> Monday – Saturday, 9:00 AM – 6:00 PM
      </p>
    </div>
  );
};

export default ContactUs;

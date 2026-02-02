import React from 'react';

const About = () => {
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
        About Our Job Portal
      </div>

      <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '15px' }}>
        Welcome to our Job Portal! We connect talented professionals with leading companies across various industries. 
        Our platform makes job searching simple, efficient, and accessible to everyone.
      </p>

      <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '15px' }}>
        Our mission is to help job seekers find their dream jobs and assist employers in finding the right talent. 
        We believe in empowering careers through technology and creating opportunities for growth and success.
      </p>

      <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
        Whether you are a fresher looking for your first role or an experienced professional seeking new challenges, 
        our portal is designed to support you every step of the way.
      </p>
    </div>
  );
};

export default About;

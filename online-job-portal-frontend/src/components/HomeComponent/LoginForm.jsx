import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    role: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
    setErrorMsg(''); // clear error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginData.role || !loginData.email || !loginData.password) {
      setErrorMsg('Please fill all fields');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const payload = {
        ...loginData,
        role: loginData.role.toUpperCase()
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        payload
      );

      const user = response.data;

      if (!user || !user.id || !user.role) {
        throw new Error('Invalid response from server');
      }

      const roleLower = user.role.toLowerCase();
      localStorage.setItem('role', roleLower);

      // Clear previous IDs
      localStorage.removeItem('adminId');
      localStorage.removeItem('employeeId');
      localStorage.removeItem('employerId');
      localStorage.removeItem('userName');

      // Store relevant ID only
      if (roleLower === 'admin') {
        localStorage.setItem('adminId', user.id);
      } else if (roleLower === 'employee') {
        localStorage.setItem('employeeId', user.id);
        if (user.firstName || user.lastName) {
          localStorage.setItem(
            'userName',
            `${user.firstName || ''} ${user.lastName || ''}`.trim()
          );
        }
      } else if (roleLower === 'employer') {
        localStorage.setItem('employerId', user.id);
        if (user.firstName || user.lastName) {
          localStorage.setItem(
            'userName',
            `${user.firstName || ''} ${user.lastName || ''}`.trim()
          );
        }
      }

      navigate('/');

    } catch (error) {
      console.error('Login Error:', error);

      let message = 'Login failed. Please try again.';
      if (error.response) {
        if (error.response.status === 401) message = 'Invalid email or password';
        else if (error.response.status === 404) message = 'User not found';
        else if (error.response.data?.message) message = error.response.data.message;
        else message = `Server error (${error.response.status})`;
      } else if (error.request) {
        message = 'Cannot reach the server. Please check your internet or try later.';
      }

      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Responsive CSS */}
      <style>{`
        * { box-sizing: border-box; }

        .login-container { width: 100%; max-width: 480px; margin: 60px auto; padding: 40px 30px; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.15); background-color: #FFF9E6; border: 2px solid #ff69b4; font-family: Arial, sans-serif; }

        .login-header { background-color: #ff69b4; color: white; padding: 16px; text-align: center; border-radius: 10px; margin-bottom: 30px; font-weight: bold; font-size: 22px; }

        .form-group { margin-bottom: 24px; }

        .login-input { width: 100%; padding: 14px 16px; border: 2px solid #ff69b4; border-radius: 8px; font-size: 16px; outline: none; transition: border-color 0.2s; background-color: #fff; }

        .login-button { background-color: #ff69b4; color: white; border: none; padding: 14px 40px; border-radius: 8px; cursor: pointer; font-size: 17px; font-weight: 600; transition: background-color 0.2s; width: 100%; }

        @media (max-width: 768px) {
          .login-container { margin: 40px 16px; padding: 30px 20px; }
        }

        @media (max-width: 480px) {
          .login-container { margin: 20px 12px; padding: 24px 16px; border-radius: 12px; }
          .login-header { font-size: 18px; padding: 14px; }
          .login-input { padding: 12px 14px; font-size: 15px; }
          .login-button { padding: 14px; font-size: 16px; }
        }
      `}</style>

      <div className="login-container">
        <div className="login-header">User Login</div>

        {errorMsg && (
          <div style={{
            color: '#dc3545',
            background: '#ffebee',
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>User Role *</label>
            <select
              name="role"
              value={loginData.role}
              onChange={handleChange}
              className="login-input"
              disabled={loading}
              required
            >
              <option value="">Select Role</option>
              <option value="EMPLOYEE">Employee</option>
              <option value="EMPLOYER">Employer</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              className="login-input"
              disabled={loading}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              className="login-input"
              disabled={loading}
              required
              placeholder="Enter your password"
            />
          </div>

          <div style={{ textAlign: 'center', marginTop: '25px' }}>
            <button
              type="submit"
              disabled={loading}
              className="login-button"
              style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;

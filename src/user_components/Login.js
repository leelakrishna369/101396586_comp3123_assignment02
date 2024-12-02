import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../apiClient';
import './Login.css'; // Import custom styles

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await apiClient.post('/api/v1/user/login', { email, password });

      if (response.status === 200) {
        setMessage('Login successful!');
        localStorage.setItem('token', response.data.token);
        navigate('/employeelist');
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'An error occurred while logging in.'
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-field">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="Enter email"
              value={email}
              onChange={handleInput}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              placeholder="Enter password"
              value={password}
              onChange={handleInput}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        {message && <p className="error-message">{message}</p>}
        <p className="redirect-text">
          Don't have an account?{' '}
          <a href="/signup" className="signup-link">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

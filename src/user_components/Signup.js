import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import apiClient from '../apiClient';
import './Signup.css'; 

export const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleInput = (e) => {
        const { name, value } = e.target;
        if (name === 'username') setUsername(value);
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const signup = {
            username,
            email,
            password
        };

        try {
            const response = await apiClient.post('/api/v1/user/signup', signup);
            setSubmitted(true);
            setUsername("");
            setEmail("");
            setPassword("");
        } catch (error) {
            console.error("Error: ", error.message);
        }

        setTimeout(() => {
            navigate('/login');
        }, 2000);
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2 className="signup-title">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label className="form-label">Username</label>
                        <input
                            className="form-input"
                            type="text"
                            name="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={handleInput}
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label className="form-label">Email</label>
                        <input
                            className="form-input"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleInput}
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label className="form-label">Password</label>
                        <input
                            className="form-input"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={handleInput}
                            required
                        />
                    </div>
                    <button className="signup-button" type="submit">
                        Sign Up
                    </button>
                </form>
                {submitted && (
                    <p className="success-message">Sign Up Successful! Redirecting to login...</p>
                )}
                <p className="login-redirect">
                    Already have an account?{" "}
                    <a href="/login" className="login-link">Login</a>
                </p>
            </div>
        </div>
    );
};

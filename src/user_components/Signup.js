import 'bulma/css/bulma.min.css';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import apiClient from '../apiClient';

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
            const token = localStorage.getItem('token');
            const response = await apiClient.post('/api/v1/user/signup', signup, {
                headers: { Authorization: `Bearer ${token}` },
            });
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
        <div className="container is-max-desktop">
            <div className="columns is-centered">
                <div className="column is-half">
                    <div className="box">
                        <h2 className="title is-4 has-text-centered has-text-primary">Sign Up</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="field">
                                <label className="label">Username</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        name="username"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={handleInput}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Email</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={handleInput}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Password</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={handleInput}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button className="button is-primary is-fullwidth" type="submit">
                                        Sign Up
                                    </button>
                                </div>
                            </div>
                        </form>
                        {submitted && (
                            <p className="has-text-success has-text-centered mt-3">
                                Sign Up Successful! Redirecting to login...
                            </p>
                        )}
                        <p className="has-text-centered mt-3">
                            Already have an account?{" "}
                            <a href="/login" className="has-text-primary">Login</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

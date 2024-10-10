import React, { useState } from "react";
import loginImg from './signupImg.jpeg'; 
import './Log.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (error) {
            setError("");
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (error) {
            setError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("You should enter both email and password.");
            return;
        }

        setError(""); 
        await submitLoginToAPI();
    };

    const submitLoginToAPI = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            const { token, user } = res.data; 
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/'); // Navigate to home after successful login
        } catch (error) {
            setError(error.response?.data?.message || "Login failed. Please try again.");
        }
    };

    const turnRegister = () => {
        navigate('/signup'); 
    };

    return (
        <div className="login">
            <div className="boxImg" style={{ backgroundImage: `url(${loginImg})` }}>
                <h3>Welcome Back!</h3>
                <p>Login to Continue</p>
            </div>
            <div className="boxForm">
                <h5>Login to REAN</h5>
                <div className="turnButton">
                    <button onClick={() => navigate('/login')}>Login</button>
                    <button onClick={turnRegister}>Register</button>
                </div>
                {error && (
                    <div className="error-messages" aria-live="assertive">
                        <p>{error}</p>
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        placeholder='Enter Your Email Address'
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder='Enter Your Password'
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

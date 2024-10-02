import React, { useState } from "react";
import signupImg from './signupImg.jpeg';
import './SignUp.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../Context/Usercontext';

export default function Signup() {
    const navigate = useNavigate(); 
    const { signup } = useAuth();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUserName] = useState('');
    const [role, setRole] = useState('');
    const [errorMessages, setErrorMessages] = useState({
        username: '',
        email: '',
        password: '',
        role: '',
    });

    function turnLogin() {
        navigate('/log');
    }

    async function handleSubmit(e) {
        e.preventDefault();
        
        
        setErrorMessages({
            username: '',
            email: '',
            password: '',
            role: '',
        });

        
        let hasError = false;
        const newErrorMessages = {};

        if (!username) {
            newErrorMessages.username = "User Name is required";
            hasError = true;
        }
        if (!email) {
            newErrorMessages.email = "Email is required";
            hasError = true;
        }
        if (!password) {
            newErrorMessages.password = "Password is required";
            hasError = true;
        }
        if (!role) {
            newErrorMessages.role = "Role is required";
            hasError = true;
        } else if (!['client', 'admin'].includes(role.toLowerCase())) {
            newErrorMessages.role = "Role must be 'client' or 'admin' only";
            hasError = true;
        }

        
        if (hasError) {
            setErrorMessages(newErrorMessages);
            return; 
        }

        const errorResponse = await signup({ username, email, password, role });

        if (errorResponse) {
            if (errorResponse.status === 400) {
                setErrorMessages({ ...errorMessages, email: "Email already exists" });
            } else if (errorResponse.status === 500) {
                setErrorMessages({ ...errorMessages, role: "Role must be 'client' or 'admin' only" });
            } else {
                setErrorMessages({ ...errorMessages, general: "An unexpected error occurred." });
            }
        } else {
            navigate('/');
        }
    }

    return (
        <div className="signup">
            <div className="boxImg" style={{ backgroundImage: `url(${signupImg})` }}>
                <h3>Learning With Us Is Simpler ;)</h3>
                <p>Come Join Us</p>
            </div>
            <div className="boxForm">
                <h5>Welcome to REAN...!</h5>
                <div className="turnButton">
                    <button onClick={turnLogin}>Login</button> 
                    <button className="active">Register</button>
                </div>
                <p className="title-boxForm">Create a new account to enjoy all our features!</p>

                {errorMessages.general && (
                    <div className="error-messages">
                        <p>{errorMessages.general}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">User Name</label>
                    <input
                        type="text"
                        id="username"
                        placeholder='Enter Your User Name'
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    {errorMessages.username && <p className="error">{errorMessages.username}</p>}

                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        placeholder='Enter Your Email Address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errorMessages.email && <p className="error">{errorMessages.email}</p>}
                    
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder='Enter Your Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errorMessages.password && <p className="error">{errorMessages.password}</p>}

                    <label htmlFor="role">Your Role</label>
                    <input
                        type="text"
                        id="role"
                        placeholder='Client or Admin'
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    />
                    {errorMessages.role && <p className="error">{errorMessages.role}</p>}
                    
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}

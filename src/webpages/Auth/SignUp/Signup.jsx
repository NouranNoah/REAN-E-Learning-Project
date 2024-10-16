
import  { useState } from "react";
import signupImg from './signupImg.jpeg';
import './SignUp.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../Context/Usercontext';
import Joi from 'joi';

export default function Signup() {
    const navigate = useNavigate();
    const { sendSignToApi, errorMessages } = useAuth();
    const [errorList, setErrorList] = useState([]);
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        role: ''
    });

    function validateRegisterForm() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let scheme = Joi.object({
            username: Joi.string().min(3).max(10).required(),
            email: Joi.string().required().custom((value, helpers) => {
                if (!emailRegex.test(value)) {
                    return helpers.message('Email is invalid.');
                }
                return value;
            }),
            password: Joi.string().min(6).required(),
            role: Joi.string().valid('admin', 'client').required().messages({
                'any.required': 'Role is required.',
                'any.only': 'Role must be either "admin" or "client".'
            })
        });
        return scheme.validate(user, { abortEarly: false });
    }

    function turnLogin() {
        navigate('/log');
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let validation = validateRegisterForm();
        if (validation.error) {
            setErrorList(validation.error.details);
        } else {
            try {
                await sendSignToApi(user);
                navigate('/');
            } catch (error) {
                console.log(error)
    
            }
        }
    }

    const handleChange = (e) => {
        const { id, value } = e.target;
        const newValue = id === 'role' ? value.toLowerCase() : value;
        setUser(prev => ({ ...prev, [id]: newValue }));
    }

    return (
        <div className="signup">
            <div className="boxImg" style={{ backgroundImage:`url(${signupImg})` }}>
                <h3>Learning With Us Is Simpler ;</h3>
                <p>Come Join Us</p>
            </div>
            <div className="boxForm">
                <h5>Welcome to REAN...!</h5>
                <div className="turnButton">
                    <button onClick={turnLogin}>Login</button>
                    <button className="active">Register</button>
                </div>
                <p className="title-boxForm">Create a new account to enjoy all our features!</p>

                {errorMessages && (
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
                        value={user.username}
                        onChange={handleChange}
                    />
                    {errorList.find(err => err.context.label === 'username') &&
                        <p className="error">{errorList.find(err => err.context.label === 'username').message}</p>
                    }

                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        placeholder='Enter Your Email Address'
                        value={user.email}
                        onChange={handleChange}
                    />
                    {errorList.find(err => err.context.label === 'email') &&
                        <p className="error">{errorList.find(err => err.context.label === 'email').message}</p>
                    }

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder='Enter Your Password'
                        value={user.password}
                        onChange={handleChange}
                    />
                    {errorList.find(err => err.context.label === 'password') &&
                        <p className="error">{errorList.find(err => err.context.label === 'password').message}</p>
                    }

                    <label htmlFor="role">Your Role</label>
                    <input
                        type="text"
                        id="role"
                        placeholder='Client or Admin'
                        value={user.role}
                        onChange={handleChange}
                    />
                    {errorList.find(err => err.context.label === 'role') &&
                        <p className="error">{errorList.find(err => err.context.label === 'role').message}</p>
                    }
                    
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    )
}

import { useState } from 'react';
import signupImg from './signupImg.jpeg';
import './SignUp.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../Context/Usercontext';
import Joi from 'joi';

export default function Signup() {
    const [activeButton, setActiveButton] = useState("register");
    const navigate = useNavigate();
    const { sendSignToApi, errorMessages } = useAuth();
    const [errorList, setErrorList] = useState([]);
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        role: ''
    });
    const [loading, setLoading] = useState(false);

    const validateRegisterForm = () => {
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
            role: Joi.string().required('Role is required.')
        });
        return scheme.validate(user, { abortEarly: false });
    };

    const turnLogin = (buttonName) => {
        setActiveButton(buttonName); // تغيير الزر النشط
        navigate('/Auth/login');
    };
 

    const handleSubmit = async (e) => {
        e.preventDefault();
        let validation = validateRegisterForm();
        if (validation.error) {
            setErrorList(validation.error.details);
        } else {
            setLoading(true);
            try {
                await sendSignToApi(user);
                navigate('/Auth/login');
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUser(prev => ({ ...prev, [id]: value }));
    };

    return (
        <div className="signup">
            <div className="boxImg" style={{ backgroundImage: `url(${signupImg})` }}>
                <h3>Learning With Us Is Simpler ;</h3>
                <p>Come Join Us</p>
            </div>
            <div className="boxForm">
                <h5>Welcome to REAN...!</h5>
                {/* <div className="turnButton">
                    <button onClick={turnLogin}>Login</button>
                    <button className="active">Register</button>
                </div> */}
<div className="turnButton">
      <button
        className={activeButton === "login" ? "active" : ""}
        onClick={() => turnLogin("login")}
      >
        Login
      </button>
      <button
        className={activeButton === "register" ? "active" : ""}
        onClick={() => turnLogin("register")}
      >
        Register
      </button>
    </div>
  




                <p className="title-boxForm">Create a new account to enjoy all our features!</p>

                {errorMessages && errorMessages.general && (
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
                    {errorList.find(err => err.context.label === 'username')?.message && (
                        <p className="error">{errorList.find(err => err.context.label === 'username').message}</p>
                    )}

                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        placeholder='Enter Your Email Address'
                        value={user.email}
                        onChange={handleChange}
                    />
                    {errorList.find(err => err.context.label === 'email')?.message && (
                        <p className="error">{errorList.find(err => err.context.label === 'email').message}</p>
                    )}

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder='Enter Your Password'
                        value={user.password}
                        onChange={handleChange}
                    />
                    {errorList.find(err => err.context.label === 'password')?.message && (
                        <p className="error">{errorList.find(err => err.context.label === 'password').message}</p>
                    )}

                    <label htmlFor="role">Your Role</label>
                    <select
                        id="role"
                        value={user.role}
                        onChange={handleChange}
                        style={{backgroundColor: "#eee"}}
                    >
                        <option value="">Select Role</option>
                        <option value="client">Client</option>
                        <option value="admin">Admin</option>
                        <option value="instructor">Instructor</option>
                    </select>
                    {errorList.find(err => err.context.label === 'role')?.message && (
                        <p className="error">{errorList.find(err => err.context.label === 'role').message}</p>
                    )}
                    
                    <button type="submit" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
}

import React, { useState } from "react";
import signupImg from './signupImg.jpeg';
import './SignUp.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../Context/Usercontext'

export default function Signup() {
    const navigate = useNavigate(); 
    const {signup} = useAuth()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName ,setUserName] =useState('');

    function turnLogin() {
        navigate('/log');
    }
    function handleSubmit(e){
        e.preventDefault();
        signup({email ,userName, password})
        navigate('/')
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
                <p>Create a new account to enjoy all our features!</p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email Address</label>
                    <input type="email"
                    id="email" placeholder='Enter Your Email Address'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />
                    
                    <label htmlFor="username">User Name</label>
                    <input type="text" id="username" placeholder='Enter Your User Name'
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required />
                    
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder='Enter Your Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                    
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}

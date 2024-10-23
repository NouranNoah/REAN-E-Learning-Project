import  { useState } from "react";
import loginImg from "../../../assets/loginphoto2.jpg"; 
import './Login.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../Context/Usercontext'; 

export default function Login() {
    const navigate = useNavigate();
    const { loginToApi, errorMessages } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [localError, setLocalError] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (localError) {
            setLocalError("");
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (localError) {
            setLocalError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setLocalError("You should enter both email and password.");
            return;
        }
    
        try {
            const { user } = await loginToApi(email, password);
    
            navigate('/courses')
        } catch (error) {
            console.log(error)
            setLocalError("Login failed. Please check your credentials.");
        }
    };
    

    const turnLogin = () => {
        navigate('/Auth/signup');
    };

    return (
        <div className="login signup">
            <div className="boxImg" style={{ backgroundImage: `url(${loginImg})` }}>
                <h3>Welcome Back!</h3>
                <p>Login to Continue</p>
            </div>
            <div className="boxForm">
                <div className="turnButton">
                    <button className="active">Login</button>
                    <button onClick={turnLogin}>Register</button>
                </div>
                <h5>Login to REAN</h5>
                {localError && (
                    <div className="error-messages" aria-live="assertive">
                        <p>{localError}</p>
                    </div>
                )}
                {errorMessages && (
                    <div className="error-messages" aria-live="assertive">
                        <p>{errorMessages}</p>
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

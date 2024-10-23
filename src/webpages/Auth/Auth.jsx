import { Outlet } from "react-router-dom";
import loginImg from "../../assets/loginphoto2.jpg"
import signupImg from './SignUp/signupImg.jpeg';
export default function Auth() {
    const isLoginPage = window.location.href.includes('login');
  const backgroundImage = isLoginPage ? loginImg : signupImg; 

    return (
        <div className="signup login">

<div className="boxImg" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <h3>{isLoginPage ? 'Welcome Back!' : 'Sign Up Today!'}</h3>
        <p>{isLoginPage ? 'Login to Continue' : 'Sign Up to Get Started'}</p>
            </div>
            <Outlet/>

        </div>



    )
}
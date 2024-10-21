import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom"; 
import PropTypes from "prop-types";

export default function Logout(props) {
    let isVisible = props.isVisible;
    let isTablet = props.isTablet;
    const cookie = new Cookies();
    const navigate = useNavigate(); 
    const [isLoggedOut, setIsLoggedOut] = useState(false); 

    const gettoken = cookie.get("Bearer");

    async function handlelogout() {
        const headers = {
            Authorization: `Bearer ${gettoken}`
        };
        try {
            let res = await axios.post(`http://localhost:5000/api/auth/logout`, {}, { headers });
            console.log(res);
            cookie.remove("Bearer");
            setIsLoggedOut(true); 
        } catch (error) {
            console.log(error);
        }
    }

 
    useEffect(() => {
        if (isLoggedOut) {
            navigate("/Auth/login"); 
        }
    }, [isLoggedOut, navigate]);

    return (
      
        <button   onClick={handlelogout} style={{ color: (isVisible && isTablet) ? "white" :"black" }}
>
                Log out
            </button>
       
    );
  
    
   
}
Logout.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    isTablet: PropTypes.bool.isRequired
}

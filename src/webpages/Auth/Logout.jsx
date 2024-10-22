import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom"; 
import PropTypes from "prop-types";

export default function Logout(props) {
    const [isTablet, setIsTablet] = useState(false);
    const cookie = new Cookies();
    const navigate = useNavigate(); 
    const [isLoggedOut, setIsLoggedOut] = useState(false); 

    const gettoken = cookie.get("Bearer");
    const handleResize = () => {
        const tablet = window.innerWidth <= 1190;
          setIsTablet(tablet); // true tablet
    
   
    };
    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);
    
    

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
      
        <button   onClick={handlelogout} style={{ color:  isTablet ? "white" :"black" }}
>
                Log out
            </button>
       
    );
  
    
   
}

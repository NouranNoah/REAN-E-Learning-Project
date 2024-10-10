
import "./Navbar.css";
import logo from "../assets/rean-high-resolution-logo-white-transparent.png"
import { Link } from "react-router-dom";

import { FaBars } from "react-icons/fa6";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isTablet, setIsTablet] = useState(false);
  const [isvisable, setIsvisble] = useState(true);

  const handleResize = () => {
    const tablet = window.innerWidth <= 1190;
      setIsTablet(tablet); // true tablet
      setIsvisble(false)
    if (!tablet) {
      setIsvisble(true); 
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsvisble(prev => !prev);
    };
    const allstyle = {
        color :"white",
                    display: 'flex',
                   flexDirection: 'column', 
                     backgroundColor: '#000000b8', 
        padding: '10px',
                     margin:"0",
                    
                 position: 'absolute', 
                     top: '60px', 
                     left: '0', 
      width: '100%', 
      zIndex: 1000,
                  
    }
    const allstylere = {
        display: "flex",
        justifyContent: "space-between",
        alignitems: "center",
        gap: "20px",
    }

  const linkStyle = {
    color: "white",
    display: 'flex',
    flexDirection: 'column',
    
    padding: '10px',
    zIndex: 1000,
  
    };
    const linkStylere ={
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        textTransform: "capitalize",
        gap: "30px",
        color: "#ffff",
        fontSize: "22px",
        cursor: "pointer",
 }

  return (
    <nav>
      <div className="cont">
        <div className="logo">
          <img style={{maxWidth:"35px"}} src={logo} alt="img" />
        </div>
        {isTablet && (
      <FaBars
      onClick={toggleMenu}
      style={{ 
        fontSize: "30px",  
        cursor: "pointer",
        color: window.location.href === 'http://localhost:5173/' ? "white" : "black" 
      }}
    />
    
        )}
        { isvisable && (
          <div className="all"  style={isvisable && isTablet ? allstyle : allstylere}  >
            <div className="links" >
                          <ul style={isvisable && isTablet ? linkStyle : linkStylere} >
                <li><Link to="/" className="link">home</Link></li>
                <li><Link to="/courses" className="link">courses</Link></li>
                <li><Link to="/careers" className="link">careers</Link></li>
                <li><Link to="/blogs" className="link">blogs</Link></li>
                <li><Link to="/about" className="link">about us</Link></li>
              </ul>
            </div>
            <div className="buttons" >
              <button>
                <Link to="/login" className="link">login</Link>
              </button>
              <button>
                <Link to="/signup" className="link">sign up</Link>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}


import "./Navbar.css";
import imglogo from "../assets/logo.png"
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Logout from "../webpages/Auth/Logout";
import { FaUserCircle } from "react-icons/fa";
export default function Navbar() {
  const [isTablet, setIsTablet] = useState(false);
  const [isvisable, setIsvisble] = useState(true);
  const cookie = new Cookies();
  const gettoken = cookie.get("Bearer"); 
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
    color: "white",
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#000000b8',
    padding: '10px',
    margin: "0",
                    
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
        color:"black"
    }

  const linkStyle = {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    zIndex: 1000,
    color: "white",
  
    };
    const linkStylere ={
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        textTransform: "capitalize",
        gap: "30px",
        
        fontSize: "22px",
      cursor: "pointer",
      color: "black",
  }


  return (
    <nav className="navbar" >
      <div className="cont">
      <div className="logo">
          <img src={imglogo} alt="img" style={{ maxWidth: "200px", maxHeight: "100px" }} />
          
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
            <div className="links"   >
                          <ul style={isvisable && isTablet ? linkStyle : linkStylere } >
                <li><Link  to="/" className="link" style={{ color :isvisable && isTablet ? "white " :"black"} }>home</Link></li>
                <li><Link to="/courses" className="link" style={{ color :isvisable && isTablet ? "white " :"black"} }>courses</Link></li>          
              </ul>
            </div>
            {gettoken ? (
              <div className="buttons" >
                <Logout  isVisible={isvisable} isTablet={isTablet} />
                <button className="profile" >
                 
                  <Link to="/Profileclient" >
                  <FaUserCircle style={{display:"flex" ,justifyContent:"center",alignItems:"center", fontSize:"35px", color :isvisable && isTablet ? "white " :"black"}} />
                  </Link>
                </button>
                </div>
            )
              
              : (
  <div className="buttons">
    <button>
      <Link to="/Auth/login" className="link">login</Link>
    </button>
    <button>
      <Link to="/Auth/signup" className="link">sign up</Link>
    </button>
  </div>
)}
           
          </div>
        )}
      </div>
    </nav>
  );
}
import "./Navbar.css";
import logo from "../assets/rean-high-resolution-logo-white-transparent.png"
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
export default function Navbar() {
  const [isTablet, setIsTablet] = useState(false);
  const [isvisable, setIsvisble] = useState(true);
  const [name,setname]=useState("")
  const cookie = new Cookies();
  const gettoken = cookie.get("Bearer"); 



  useEffect(() => {
    const headers = {
        Authorization: `Bearer ${gettoken}`
    };

    axios.get("http://localhost:5000/api/auth/profile", { headers })
        .then(response => {
           setname(response.data.username)
          
   
        })
        .catch(error => {
            console.error('Error fetching profile', error);
        });
}, [gettoken]);

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
    <nav className="navbar">
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
            <div className="links"   >
                          <ul style={isvisable && isTablet ? linkStyle : linkStylere } >
                <li><Link to="/" className="link">home</Link></li>
                <li><Link to="/courses" className="link">courses</Link></li>
              
                <li><Link to="/about" className="link">about us</Link></li>
          
              </ul>
            </div>
            {gettoken && gettoken.length > 0 ? (
         <div className="buttons">     
  <button className="link">
    log out
                </button>
                <button className="profile" style={{width:"50px" ,height:"50px",borderRadius:"50%",textAlign:'center'}}>
                 
                  <Link to="Profileclient" style={{display:"flex" ,justifyContent:"center",alignItems:"center",textDecoration:"none" ,color:"#777"}}>
                    <span>{ name.slice(0,2)}</span>
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
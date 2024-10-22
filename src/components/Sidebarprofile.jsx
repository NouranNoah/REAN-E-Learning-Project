
import  { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { FaUser, FaHome } from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";
import imglogo from "../assets/logo.png"
import Logout from "../webpages/Auth/Logout";

export default function Sidebarprofile() {
    const [isSidebarActive, setIsSidebarActive] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarActive(!isSidebarActive);
    };

    return (
        <>
           
            <div className="toggle-btn" onClick={toggleSidebar}>
                {isSidebarActive ? "X" : "☰"}
            </div>

          
            <div className={`sidebar ${isSidebarActive ? "active" : ""}`}>
              
                    
                <div>
                    
          
                <div className="logo">
                    <img src={imglogo} alt="img" style={{maxWidth:"200px" ,maxHeight:"100px"}} />
                </div>
                <div className="info">
                    <div className="home">
                        <Link to="/Profileclient/profilehome">
                            <FaHome style={{ marginRight: "7px", color: "rgb(218 63 201 / 68%)" }} />
                            my Dashboard
                        </Link>
                    </div>
                    <div className="account">
                        <Link to="/Profileclient/myaccount">
                            <FaUser style={{ marginRight: "7px", color: "rgb(218 63 201 / 68%)" }} />
                            my Account
                        </Link>
                    </div>
                    <div className="mycourses">
                        <Link to="/Profileclient/mycourses">
                            <MdOutlineOndemandVideo style={{ marginRight: "7px", color: "rgb(218 63 201 / 68%)" }} />
                            my courses
                        </Link>
                    </div>
                    </div>
                    </div>

                
                <Logout/>
            </div>
        </>
    );
}






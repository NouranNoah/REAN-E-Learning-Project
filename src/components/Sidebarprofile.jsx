
import "./Sidebar.css";
import { Link } from "react-router-dom"
import { FaUser } from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { FaHome } from "react-icons/fa";

export default function Sidebarprofile() {
    return (


        <div className="sidebar">
           
            <div className="logo">
                REAN
            </div>
            <div className="info">
                <div className="home">
                    <Link to="/Profileclient/profilehome" > <FaHome style={{marginRight:"7px" , color:"#fc89ff"}}/> my home </Link>

                </div>
                <div className="account">
                <Link to="/Profileclient/myaccount"> <FaUser style={{marginRight:"7px" , color:"#fc89ff"}}/> my Acoount</Link>
                </div>
                <div className="mycourses">
                <Link to="/Profileclient/mycourses"> <MdOutlineOndemandVideo style={{marginRight:"7px" , color:"#fc89ff"}}/> my courses</Link>
                    </div>
                    </div>
              

        
            
          </div>

    
    )
}



// import "./Sidebar.css";
// import { Link } from "react-router-dom"
// import { FaUser } from "react-icons/fa";
// import { MdOutlineOndemandVideo } from "react-icons/md";
// import { FaHome } from "react-icons/fa";
// import { useState } from "react";

// export default function Sidebarprofile() {
//     const [isSidebarActive, setIsSidebarActive] = useState(false);

//     const toggleSidebar = () => {
//         setIsSidebarActive(!isSidebarActive);
//     };
//     return (

//         <>
//               {/* زر التحكم في التوجيل (مرئي فقط على الشاشات الأصغر) */}
//               <div className="toggle-btn" onClick={toggleSidebar}>
//                 {isSidebarActive ? "X" : "☰"}
//             </div>

//             <div className={`sidebar ${isSidebarActive ? "active" : ""}`}>
           
//            <div className="logo">
//                REAN
//            </div>
//            <div className="info">
//                <div className="home">
//                    <Link to="/Profileclient/profilehome" > <FaHome style={{marginRight:"7px" , color:"#fc89ff"}}/> my home </Link>

//                </div>
//                <div className="account">
//                <Link to="/Profileclient/myaccount"> <FaUser style={{marginRight:"7px" , color:"#fc89ff"}}/> my Acoount</Link>
//                </div>
//                <div className="mycourses">
//                <Link to="/Profileclient/mycourses"> <MdOutlineOndemandVideo style={{marginRight:"7px" , color:"#fc89ff"}}/> my courses</Link>
//                    </div>
//                    </div>
             

       
           
//          </div>
//         </>

      

    
//     )
// }
import  { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { FaUser, FaHome } from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";

export default function Sidebarprofile() {
    const [isSidebarActive, setIsSidebarActive] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarActive(!isSidebarActive);
    };

    return (
        <>
            {/* زر التحكم في التوجيل (مرئي فقط على الشاشات الصغيرة) */}
            <div className="toggle-btn" onClick={toggleSidebar}>
                {isSidebarActive ? "X" : "☰"}
            </div>

            {/* السايدبار */}
            <div className={`sidebar ${isSidebarActive ? "active" : ""}`}>
                <div className="logo">REAN</div>
                <div className="info">
                    <div className="home">
                        <Link to="/Profileclient/profilehome">
                            <FaHome style={{ marginRight: "7px", color: "#fc89ff" }} />
                            my home
                        </Link>
                    </div>
                    <div className="account">
                        <Link to="/Profileclient/myaccount">
                            <FaUser style={{ marginRight: "7px", color: "#fc89ff" }} />
                            my Account
                        </Link>
                    </div>
                    <div className="mycourses">
                        <Link to="/Profileclient/mycourses">
                            <MdOutlineOndemandVideo style={{ marginRight: "7px", color: "#fc89ff" }} />
                            my courses
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}






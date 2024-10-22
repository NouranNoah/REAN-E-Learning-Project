
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
import "./Mycourses.css"
import { FaBookOpenReader } from "react-icons/fa6";

export default function MyCourses() {
    const [allCourses, setAllCourses] = useState([]); 
    const [filteredCourses, setFilteredCourses] = useState([]); 
    const[show,setshow]= useState(true)
    const cookie = new Cookies();
    const gettoken = cookie.get("Bearer"); 

    useEffect(() => {
        async function handleShowCourses() {
            const headers = {
                Authorization: `Bearer ${gettoken}` 
            };
            try {
                const res = await axios.get(`http://localhost:5000/api/purchases/my-courses`, { headers });
                console.log(res.data);
                setAllCourses(res.data); 
                setFilteredCourses(res.data); 
                if (filteredCourses.length < 0) {
                    setshow(false);
                }
            } catch (error) {
                console.log(error); 
            }
        }

        handleShowCourses(); 
    }, [gettoken]); 

    const cards = filteredCourses.map((course) => (
        <div className="cards" key={course._id}>
            <div
                className="img"
                style={{
                    backgroundImage: `url(${course.image})`,
                    width: "300px",
                    height: "300px",
                    backgroundSize: "cover"
                }}
            ></div>
            <div className="text">
                <h2>{course.title}</h2>
                <p>{course.description}</p>
                <div className="spans-links" style={{ display: "flex", justifyContent: "space-between" }}>
                    <Link to={`/Profileclient/${course._id}`}>
                        <span>Show now</span>
                    </Link>
                </div>
            </div>
        </div>
    ));

    return (
        <div className="allpage">
            <nav className="profile-nav">
               
               <Link to="/">  home</Link>
               <Link to ="/courses"> courses</Link>


       </nav>
               <div className="hom-landing">
            <div className="text">
                <h3>Sharpen Your Skills With Professional Online Courses</h3>
                <button className="explore-now">
                    <Link  to="/courses" className ="link">
                    explore-now
                    </Link>  
                </button>
                
              </div>
             </div>   
            <div className="courses">
                <h3 style={{margin:" 15px  0",paddingLeft:"40px" , textTransform:"capitalize"} }> my courses  <FaBookOpenReader /></h3>
                <div className="cont">
                { show ? cards : <p style={{color:"black"}}> no courses found yet</p>}
                </div>
                 
              
            </div>
            
      </div>
           
      
       
    );
}

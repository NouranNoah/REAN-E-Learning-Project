
       
// import { useContext, useEffect, useState } from "react";
// import Navbar from "../../../components/Navbar";
// import "./Cources.css";
// import Search from "./Search";
// import axios from "axios";
// import Footer from "../../../components/Footer"
// import { Link } from "react-router-dom";
// import {CourseDetailsContext} from "./Coursedetaicontact"

// export default function Courses() {
//     const [allCourses, setAllCourses] = useState([]);
//     const [filteredCourses, setFilteredCourses] = useState([]);
//     const courceactive=useContext(CourseDetailsContext)

//     useEffect(() => {
//         fetch("http://localhost:5000/api/courses")
//             .then((res) => {
//                 if (!res.ok) {
//                     throw new Error(res);
//                 }
//                 return res.json();
//             })
//             .then((data) => {
//                 setAllCourses(data);
//                 setFilteredCourses(data); 
//             })
//             .catch((error) => {
//                 console.error('Error fetching courses:', error);
//             });
//     }, []);

//     async function handleSearch(word) {
//         if (word === "all") {
//             setFilteredCourses(allCourses);
//         }
//         else {
//             try {
//                 const response = await axios.get(`http://localhost:5000/api/courses/search/${encodeURIComponent(word)}`);
//                 setFilteredCourses(response.data);
//             } catch (error) {
//                 console.error("Error fetching courses:", error);
//             }
//         }
//     }
//     function handleprice(selectprice) {
//         const filterprice = allCourses.filter((course) => {
//             if (selectprice === "1000") {
//                 return course.price >= 1000;  
//             } else if (selectprice === "-1000") {
//                 return course.price <= 1000;  
//             }
//             else {
//                 return true;  
//             }
//         });
    
      
//         setFilteredCourses(filterprice);  
//         console.log(filteredCourses)
//     }
//     /**to get id for the next page */
//     function handlegetid(e) {
//         courceactive.setCourseDetails(e)
//         console.log(e)
      
//     }
   

//     const cards = filteredCourses.map((course, index) => (
//         <div className="cards" key={index}>
//             <div className="img" style={{backgroundImage:`url(${course.image})`,width:"300px",height:"300px",backgroundSize:"cover"}}>

//             </div>

//             <div className="text">
              
//                 <h2>{course.title}</h2>
               
//                 <p>{course.description}</p>
//                 <div className="spans-links" style={{display:"flex",justifyContent:"space-between"}}>
//                 <span>{course.price}$</span>
//                 <Link to="/details">
//                 <span onClick={() => handlegetid(course._id)}>  learn more </span>
//                 </Link>
//                     </div>

            
//             </div>
//         </div>
//     ));
    
 
    

//     return (
//         <>
//             <Navbar />
//             <Search allCourses={allCourses} handleSearch={handleSearch} handleprice={handleprice} />
//             <div className="courses">
//                 <div className="cont">
//                     {cards}
//                 </div>
//             </div>
//             <Footer/>
//         </>
//     );
// }


import {  useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import "./Courses.css";
import Search from "./Search";
import axios from "axios";
import Footer from "../../../components/Footer";
import { Link } from "react-router-dom";


export default function Courses() {
    const [allCourses, setAllCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/courses")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res);
                }
                return res.json();
            })
            .then((data) => {
                setAllCourses(data);
                setFilteredCourses(data);
            })
            .catch((error) => {
                console.error('Error fetching courses:', error);
            });
    }, []);

    async function handleSearch(word) {
        if (word === "all") {
            setFilteredCourses(allCourses);
        } else {
            try {
                const response = await axios.get(`http://localhost:5000/api/courses/search/${encodeURIComponent(word)}`);
                setFilteredCourses(response.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        }
    }

    function handlePrice(selectPrice) {
        const filterPrice = allCourses.filter((course) => {
            if (selectPrice === "1000") {
                return course.price >= 1000;
            } else if (selectPrice === "-1000") {
                return course.price <= 1000;
            } else {
                return true;
            }
        });

        setFilteredCourses(filterPrice);
    }

    const cards = filteredCourses.map((course) => (
        <div className="cards" key={course._id}>
            <div className="img" style={{ backgroundImage: `url(${course.image})`, width: "300px", height: "300px", backgroundSize: "cover" }}></div>
            <div className="text">
                <h2>{course.title}</h2>
                <p>{course.description}</p>
                <div className="spans-links" style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>{course.price}$</span>
                    <Link to={`/details/${course._id}`}> 
                        <span>Learn more</span>
                    </Link>
                </div>
            </div>
        </div>
    ));

    return (
        <><div className="coursesnav">
   <Navbar />
        </div>
         
            <Search allCourses={allCourses} handleSearch={handleSearch} handleprice={handlePrice} />
            <div className="courses">
                <div className="cont">
                    {cards}
                </div>
            </div>
            <Footer />
        </>
    );
}

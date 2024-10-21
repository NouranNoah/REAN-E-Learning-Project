import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import "../../cources/Courses.css"
import { PiVideoDuotone } from "react-icons/pi";

export default function CourseHistory() {
    const cookie = new Cookies();
    const gettoken = cookie.get("Bearer");
    const [datahistory, setdatahistory] = useState([])
    useEffect(() => {
        async function getHistory() {
            const headers = {
                Authorization: `Bearer ${gettoken}`
            };
            try {
                let res = await axios.get('http://localhost:5000/api/purchases/my-accessed-courses', { headers });
    
                 setdatahistory(res.data)
          
            } catch (error) {
                console.log(error);
            }
        }

        getHistory();
    }, [gettoken]); 
    console.log(datahistory)


    const cards = datahistory.map((course) => (
        <div className="cards" key={course._id}>
            <div className="img" style={{ backgroundImage: `url(${course.image})`, width: "300px", height: "300px", backgroundSize: "cover" }}></div>
            <div className="text">
                <h2>{course.title}</h2>
                
                <div className="spans-links" style={{ display: "flex", justifyContent: "space-between" }}>
                   
                    <Link to={`/Profileclient/${course._id}`}> 
                        <span> Continue watching</span>
                    </Link>
                </div>
            </div>
        </div>
    ));
    return (
        

        <div className="watched">
            <h3 >Previously Watched <PiVideoDuotone style={{margin:"15 0 0 0"}}/></h3>
            <div className="cont">
            
 {cards}
            </div>
          
</div>
    )
}
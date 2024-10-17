import { Link } from "react-router-dom"
import "./Profilehome.css"

export default function Homeprofile() {

    return (
        

        <div className="home-landing">
            <div className="text">
                <h3>Sharpen Your Skills With Professional Online Courses</h3>
                <button className="explore-now">
                    <Link  to="/courses" className ="link">
                    explore-now
                    </Link>  
                </button>
                
              </div>
             </div>    

    )
}
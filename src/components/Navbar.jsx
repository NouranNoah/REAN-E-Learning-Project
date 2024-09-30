import "./Navbar.css"
import { Link } from "react-router-dom";
export  default function Navbar(){
     return(
        <>
        <nav>
            <div className="cont">
                <div className="logo">
                        REAN
                </div>
                <div className="all">
                <div className="links">
                    <ul>
                        <li>
                        <Link to="/" className="link"> home</Link>
                            </li>
                        <li> <Link to="/courses" className="link"> courses</Link></li>
                        <li> <Link to="/careers" className="link"> careers</Link></li>
                        <li><Link to="/blogs" className="link"> blogs</Link></li>
                        <li><Link to="/about" className="link"> about us</Link></li>
                    </ul>

                </div>
                <div className="buttons">
                    <button>
                       <Link to="/login" className="link">login</Link> 
                    
                    </button>
                    <button>
                     <Link to="/signup"className="link">sign up</Link>   
                    </button>
                </div>
                <div/>

            </div>
            </div>
        </nav>
   
        </>
     )
}
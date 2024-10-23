import { Link } from "react-router-dom"

import headerimg from "../../../assets/Screenshot_2024-10-02_012206-removebg.png"
export default function Header() {
    return (
        <header>
            <div className="cont">
                <div className="text">
                    <div className="info">
                        <h1> <span>Studying</span> Online is now <br></br> much easier</h1>
                        <p>REAN LEARN is an interesting platform that will <br>
                        </br>teach you in more an interactive way</p>
                    </div>
                    <button className="join-btn">
                        <Link to="/Auth/signup" className="join-btn" >join free</Link>
                    </button>
                </div>
                <div className="img">
                    <img src={headerimg} alt="img" />
                </div>
            </div>
        </header>
    )
}
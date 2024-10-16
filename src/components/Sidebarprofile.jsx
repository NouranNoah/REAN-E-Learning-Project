
import { Link } from "react-router-dom"
export default function Sidebarprofile() {
    return (
        <div className="sidebar">
            <div className="logo">
                REAN
            </div>
            <div className="info">
                <h4> hello username</h4>
                <div className="account">
                <Link to="myaccount"> my Acoount</Link>
                </div>
              

            </div>
            
</div>

    
    )
}
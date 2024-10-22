import logo from "../assets/rean-high-resolution-logo-white-transparent.png"
 import "./footer.css"
 export default function Footer() {
    return (
        <footer>
            <div className="cont">
                <img style={{maxWidth:"40px"}} src={logo} alt="img" />
                < div className="header" >

    <p>
    Subscribe to get our Newsletter
    </p>  
                       </div>
         
              <p style={{color:"rgba(178, 179, 207, 1)"}}>© 2024 Class Technologies Inc. </p>
            
            </div>
        </footer>
    )
}
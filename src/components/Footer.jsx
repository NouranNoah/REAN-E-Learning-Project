 import logo from "../assets/rean-high-resolution-logo-white-transparent.png"
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
            <form>
                <input type="email" placeholder="Your Email"></input>
                <button type="sunmit"> Subscribe </button>
                </form>
              <p style={{color:"rgba(178, 179, 207, 1)"}}>© 2024 Class Technologies Inc. </p>
            
            </div>
        </footer>
    )
}

import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import CloudSoftware from "./Cloud Software";
import Header from "./Header";
import Sucsess from "./Sucsess";
import WhatisRean from "./WhatisRean";


export default function Home() {
    return (
        <>
            <div className="color" style={{backgroundColor:"rgba(73, 187, 189, 1)", color:"white"}}>
                <Navbar  />
         
            </div>
            <Header/>
            <Sucsess />
            <WhatisRean />
            <CloudSoftware />
        
            <Footer/>
            
     

    
        </>
    );
}



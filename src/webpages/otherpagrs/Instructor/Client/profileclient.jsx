import { Outlet } from "react-router-dom";
import Sidebarprofile from "../../../../components/Sidebarprofile";
import "./Profileclient.css"
import "./Profilehome.css";

export default function profileclient() {
  return (
    <div className="profileclient">
        <Sidebarprofile />
        {/* <Homeprofile/> */}
<Outlet/>
    </div>
  
  )
}

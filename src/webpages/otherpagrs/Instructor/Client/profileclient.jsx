import { Outlet } from "react-router-dom";
import Homeprofile from "../../../../components/Homeprofile";
import Sidebarprofile from "../../../../components/Sidebarprofile";
import "./Profileclient.css"

export default function profileclient() {
  return (
    <div className="profileclient">
        <Sidebarprofile />
        {/* <Homeprofile/> */}
<Outlet/>
    </div>
  
  )
}

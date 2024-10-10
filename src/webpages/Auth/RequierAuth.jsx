import { useAuth } from "../Context/Usercontext"; 
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequierAuth() {
    const { userName } = useAuth(); 
    const location =useLocation()
    console.log(userName);
    return userName ? <Outlet /> : <Navigate state={{from:location}} replace to="/login" />;
}

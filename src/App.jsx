import './index.css';
import "../src/components/Navbar.css"
import Home from './webpages/otherpagrs/Home/Home';
import Courses from './webpages/otherpagrs/cources/Courses';
import { Route, Routes } from 'react-router-dom';
import Login from './webpages/Auth/Logincompnant/Login';
import Signup from './webpages/Auth/SignUp/Signup';
import { UserProvider } from './webpages/Context/Usercontext';
import CourseDetalis from './webpages/otherpagrs/cources/CourseDetalis';
import Profileclient from "./webpages/otherpagrs/Instructor/Client/profileclient";
import Myprofile from './webpages/otherpagrs/Instructor/Client/Myprofile';
import Homeprofile from "./webpages/otherpagrs/Instructor/Client/Homeprofile";
import Mycourses from './webpages/otherpagrs/Instructor/Client/Mycourses';
import Watchcourse from './webpages/otherpagrs/cources/Watchcourse';
import PaymentPage from './webpages/paymentstrip/Payment'; 
import RequierAuth from './webpages/Auth/RequierAuth';
import Contact from "./webpages/otherpagrs/Home/Contact"
import Uplode from './webpages/otherpagrs/Instructor/Client/Upload';

export default function App() {
    return (
        <UserProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/Contact' element={<Contact/> } />
                <Route path='/Auth'>
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                   
                    
                </Route>
                {/* {  protected routes} */}
                <Route element={<RequierAuth />}>
                <Route path="/courses" element={<><Courses /></>} />
                <Route path="/details/:id" element={<CourseDetalis />} />
                <Route path="/payment" element={<PaymentPage />} /> 
                <Route path='/Profileclient' element={<Profileclient />}>
                  <Route index element={<Homeprofile />} />
                    <Route path='profilehome' element={<Homeprofile />} />
                    <Route path='myaccount' element={<Myprofile />} />
                        <Route path='mycourses' element={<Mycourses />} />
                        <Route path='uploade' element={<Uplode />} />
                    <Route path=':id' element={<Watchcourse />} />
                </Route>
                </Route>
                
            </Routes>
        </UserProvider>
    );
}





import './index.css';
import Home from './webpages/otherpagrs/Home/Home';
import Courses from './webpages/otherpagrs/cources/Courses';
import Blogs from './webpages/otherpagrs/Blogs';
import About from './webpages/otherpagrs/About';
import Careers from './webpages/otherpagrs/Careers';
import { Route, Routes } from 'react-router-dom';
import Login from './webpages/Auth/Logincompnant/Login';
import Signup from './webpages/Auth/SignUp/Signup';
import { UserProvider } from './webpages/Context/Usercontext';
import CourseDetalis from './webpages/otherpagrs/cources/CourseDetalis';
import RequierAuth from './webpages/Auth/RequierAuth';
import Instructor from './webpages/otherpagrs/Instructor/Instructor/Instructor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import  Profileclient from "./webpages/otherpagrs/Instructor/Client/profileclient"
import Myprofile from './components/Myprofile';
import { Navigate } from 'react-router-dom';
import Homeprofile from "./components/Homeprofile"
import Mycourses from './components/Mycourses';

export default function App() {
    return (
        <UserProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/courses" element={<><Navbar /> <Courses /><Footer /></>} />
                <Route path="/careers" element={<><Navbar /><Careers /><Footer /></>} />
                <Route path="/details/:id" element={<CourseDetalis />} />
                <Route path="/blogs" element={<><Navbar /><Blogs /><Footer /></>} />
                <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
                <Route path="/instructor" element={<><Navbar /><Instructor /></>} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            
                <Route path='/Profileclient' element={<Profileclient />}>
                    <Route index element={<Navigate to="profilehome" />} />
                    <Route path='profilehome' element={<Homeprofile />} />
                    <Route path='myaccount' element={<Myprofile />} />
                    <Route path='mycourses' element={<Mycourses/>} />
                </Route>
            </Routes>
        </UserProvider>
    );
}


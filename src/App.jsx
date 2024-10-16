
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

export default function App() {
    return (
        <UserProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                
                
                <Route path="/courses" element={<Courses />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/details/:id" element={<CourseDetalis />} /> 
                    <Route path="/blogs" element={<Blogs />} />
                    <Route path="/about" element={<About />} />

         
                 
                </Routes>
            
        </UserProvider>
    );
}

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
import Client from './webpages/otherpagrs/Instructor/Client/Client';

export default function App() {
    return (
        <UserProvider>
            <Routes>
                <Route 
                    path="/" 
                    element={<Home />}/>
                <Route 
                    path="/courses" 
                    element={
                        <>
                            <Navbar />
                            <RequierAuth>
                                <Courses />
                            </RequierAuth>
                            <Footer />
                        </>
                    } 
                />
                <Route 
                    path="/careers" 
                    element={
                        <>
                            <Navbar />
                            <RequierAuth>
                                <Careers />
                            </RequierAuth>
                            <Footer />
                        </>
                    } 
                />
                <Route 
                    path="/details/:id" 
                    element={
                        <>
                            <Navbar />
                            <RequierAuth>
                                <CourseDetalis />
                            </RequierAuth>
                            <Footer />
                        </>
                    } 
                />
                <Route 
                    path="/blogs" 
                    element={
                        <>
                            <Navbar />
                            <Blogs />
                            <Footer />
                        </>
                    } 
                />
                <Route 
                    path="/about" 
                    element={
                        <>
                            <Navbar />
                            <About />
                            <Footer />
                        </>
                    } 
                />
                <Route
                    path="/instructor"
                    element={
                        <>
                        <Navbar />
                        <Instructor />
                        </>

                    }
                />
                <Route
                    path="/client"
                    element={
                        <>
                        <Navbar />
                        <Client />
                        </>

                    }
                />
                
               
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                
            </Routes>
        </UserProvider>
    );
}

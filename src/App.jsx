
import './index.css';
import Home from './webpage/website/Home';
import Courses from './webpage/website/Courses';
import Blogs from './webpage/website/Blogs';
import About from './webpage/website/About';
import Careers from './webpage/website/Careers';

import { Route,Routes } from 'react-router-dom';
import Log from './webpage/Auth/Log';
import Signup from './webpage/Auth/Signup';

export default function App(){
   return(
    <>

    <Routes>
 
               <Route path="/" element={<Home />} />
               <Route path="/courses" element={<Courses />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/about" element={<About />} />
                <Route path='/log' element={<Log/>}></Route>
                <Route path='signup' element={<Signup/> }></Route>
          </Routes>
     

    </>
   
   )
}
import { useEffect,  useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import axios from "axios";
import Navbar from "../../../components/Navbar";
import Cookies from "universal-cookie";
import { FcCheckmark } from "react-icons/fc";
import Footer from "../../../components/Footer";
export default function CourceDetalis() {
    const cookie = new Cookies();
    const gettoken = cookie.get("Bearer");
    console.log(gettoken)
    const [sucsess, setsucsess] = useState(false);
    const [myCourses, setMyCourses] = useState([]);
    const [courseExists, setCourseExists] = useState(false); 
    const { id } = useParams(); 
    const [showData, setShowData] = useState([]);
    const nav = useNavigate("")
    useEffect(() => {
        async function seeMyCourses() {
            const headers = {
                Authorization: `Bearer ${gettoken}`
            };
            try {
                let res = await axios.get(`http://localhost:5000/api/purchases/my-courses`, { headers });
                setMyCourses(res.data); 
                const exists = res.data.some(course => course._id === id);
                setCourseExists(exists);
            } catch (error) {
                console.log(error);
            }
        }
        seeMyCourses();
    }, [gettoken, id]);

    useEffect(() => {
        async function handleShowCourse() {
            try {
                const res = await axios.get(`http://localhost:5000/api/courses/${id}`); 
                setShowData([res.data]);
            } catch (error) {
                console.log(error);
            }
        }

        handleShowCourse();
    }, [id]); 

    async function handleBuy() {
        if (courseExists) {
            nav("/Profileclient")
            return; 
        }

        const headers = {
            Authorization: `Bearer ${gettoken}`
        };
        try {
            let res = await axios.post(
                `http://localhost:5000/api/purchases/purchase/${id}`, 
                null, 
                { headers }
            );
            setsucsess(true);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }


    const learnedArray = showData.map(course => course.learned.split('\n'));
    console.log(learnedArray)
    const showlistlearned = learnedArray.flat().map((item, index) => (
        <ul key={index} style={{padding:"10px 0"}} className="grid">
            <li > <span style={{display:"inline-block",paddingRight:"10px"}}><FcCheckmark /></span>{item}</li>
        </ul>
    ));

    const show = showData.map((e, index) => (
        <>
                  <div className="landing" key={index}>
            <h1>{e.title} Course for web developer</h1>
            <p>{e.description}</p>
            </div>
           
            <div className="tobuy" style={{zIndex:"1000000000"}}>
                <div
                    className="img"
                    style={{
                        backgroundImage: `url(${e.image})`,
                        backgroundSize: "cover",
                        height: "300px"
                    }}
                ></div>
                <div className="info">
                    <h2>Subscribe to Udemy’s top courses</h2>
                    <p>Get this course, plus 12,000+ of our top-rated courses, Learn more</p>
                </div>
                <div className="price">{e.price}$</div>
                <div className="button"  onClick={handleBuy}>
                    <button>{courseExists ? "go to watch " :" buy bow"}</button>
                </div>
                {sucsess && <p className="sucsess" style={{color:"green" ,padding :"0 20px"}}>Your purchase was successful! Thank you for choosing our educational courses</p>}
            </div>
    
        </>
  
    ));
  
 


    return (
        <>
         
            <div className="details-cource" >
                <div className="cont">
                    {show}
                </div>
                <div className="cont" >
                <div className="list">
                    <h2> what you will learn !</h2>
                    <div className="all">
                    {showlistlearned}
                    </div>
                  
                </div>
                </div>
                <div style={{marginTop:"80px"}}>
                <Footer />
                </div>
           
                
              
            
            </div>
        </>
    );
}



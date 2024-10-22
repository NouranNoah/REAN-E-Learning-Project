import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../components/Navbar";
import Cookies from "universal-cookie";
import { FcCheckmark } from "react-icons/fc";
import Footer from "../../../components/Footer";

export default function CourceDetalis() {
    const cookie = new Cookies(); 
    const gettoken = cookie.get("Bearer");
    const [courseExists, setCourseExists] = useState(false); 
    const { id } = useParams(); 
    const [showData, setShowData] = useState([]);
    const nav = useNavigate("");

    useEffect(() => {
        async function seeMyCourses() {
            const headers = {
                Authorization: `Bearer ${gettoken}`
            };
            try {
                let res = await axios.get(`http://localhost:5000/api/purchases/my-courses`, { headers });
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
                cookie.set("course-id", id);
            } catch (error) {
                console.log(error);
            }
        }

        handleShowCourse();
    }, [id]);

    function handleBuy() {
        console.log("esraa");
        if (courseExists) {
            nav("/Profileclient");
        } else  {
            nav("/payment");
        }
     
    }

    const learnedArray = showData.map(course => course.learned.split('\n'));
    const showlistlearned = learnedArray.flat().map((item, index) => (
        <ul key={index} style={{ padding: "10px 0" }} className="grid">
            <li><span style={{ display: "inline-block", paddingRight: "10px" }}><FcCheckmark /></span>{item}</li>
        </ul>
    ));

    const show = showData.map((e,index) => (
        <div className="tobuy" key={index}>
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
            <div className="price" >{e.price}$</div>
            <div className="button" onClick={handleBuy} >
                <button className="button-issue">{courseExists ? "go to watch" : "buy now"}</button>
            </div>
        </div>
    ));

    const landing = showData.map((e,index) => (
        <div className="landing" key={index}>
            <h1>{e.title} Course for web developer</h1>
            <p>{e.description}</p>
        </div>
    ));

    return (
        <>
            <div className="coursesnav">
                <Navbar />
            </div>

            <div className="details-cource">
                <div className="text">
                    {landing}
                </div>
                <div className="cont">
                    <div className="list">
                        <h2>What you will learn!</h2>
                        <div className="all">
                            {showlistlearned}
                        </div>
                    </div>
                    {show}
                </div>
                <div style={{ marginTop: "80px" }}>
                    <Footer />
                </div>
            </div>
        </>
    );
}



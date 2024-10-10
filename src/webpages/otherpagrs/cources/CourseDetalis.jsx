import { useEffect,  useState } from "react";
import { useParams } from "react-router-dom"; 
import axios from "axios";
import Navbar from "../../../components/Navbar";
export default function CourceDetalis() {
    const { id } = useParams(); 
    const [showData, setShowData] = useState([]);

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

    const show = showData.map((e, index) => (
        <>
                  <div className="landing" key={index}>
            <h1>{e.title} Course for web developer</h1>
            <p>{e.description}</p>
            </div>
            <div className="tobuy">
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
                <div className="button">
                    <button>Add to cart</button>
                </div>
            </div>
    
        </>
  
    ));

    return (
        <>
            <Navbar />
            <div className="details-cource">
                <div className="cont">
                    {show}
                </div>
            </div>
        </>
    );
}



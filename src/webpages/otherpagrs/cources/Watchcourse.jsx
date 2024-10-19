
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import "./Courses.css";
import Cookies from "universal-cookie";


export default function WatchCourse() {
    const { id } = useParams();
    const [showData, setShowData] = useState([]);
    const [name,setname]=useState("")
    const videoRef = useRef(null);
    const cookie = new Cookies();
    const gettoken = cookie.get("Bearer");
    console.log(gettoken)
    useEffect(() => {
        const headers = {
            Authorization: `Bearer ${gettoken}`
        };
    
        axios.get("http://localhost:5000/api/auth/profile", { headers })
            .then(response => {
               setname(response.data.username)
              
       
            })
            .catch(error => {
                console.error('Error fetching profile', error);
            });
    }, [gettoken]);
    

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

    useEffect(() => {
        if (showData.length > 0) {
            const player = videojs(videoRef.current, {
                controls: true,
                autoplay: false,
                preload: 'auto',
            });

            player.ready(() => {
                const controlBar = player.controlBar;

               
                const addButton = controlBar.addChild('button', {
                    name: 'add3s',
                    className: 'vjs-custom-button',
                });

              
                addButton.el().innerHTML = `<span class="vjs-icon" aria-hidden="true"><FaPlus /></span> +3s`;

               
                const subtractButton = controlBar.addChild('button', {
                    name: 'subtract3s',
                    className: 'vjs-custom-button',
                });

          
                subtractButton.el().innerHTML = `<span class="vjs-icon" aria-hidden="true"><FaMinus /></span> -3s`;

         
                addButton.on('click', () => adjustTime(3));
                subtractButton.on('click', () => adjustTime(-3));
            });

            return () => {
                player.dispose();
            };
        }
    }, [showData]);

    const videocourse = showData.map((course, index) => {
        const videoSrc = `http://localhost:5000/${course.video}`;

        return (
            <div className="watch-course" key={index}>
                <div className="cont">
                    <video
                        ref={videoRef}
                        className="video-js vjs-default-skin"
                        controls
                        preload="auto"
                        width="600"
                        height="300"
                    >
                        <source src={videoSrc} type="video/mp4" />
                        <p>Your browser does not support HTML5 video.</p>
                    </video>
                    <h4>{course.description}</h4>
                </div>
            </div>
        );
    });

    const adjustTime = (seconds) => {
        const player = videojs(videoRef.current);
        const newTime = player.currentTime() + seconds;
        player.currentTime(newTime);
    };

    return (
        <>
          
            <div className="contwatch" >
            <div className="hom-landing">
            <div className="text">
                <h3>Sharpen Your Skills With Professional Online Courses</h3>
                <button className="explore-now">
                    <Link  to="/courses" className ="link">
                    explore-now
                    </Link>  
                </button>
                
              </div>
             </div>   
    
            <div className="cont">
                <div className="headerwatch" style={{display:"flex" , gap:"20px" ,alignItems:"center"}}>
                    <span style={{width:"50px",height:"50px",borderRadius:"50%" ,backgroundColor:"#eee",display:"flex",justifyContent:"center",alignItems:"center"}}>{name.slice(0, 2)}</span>
                    <p style={{fontWeight:"bold" ,color:"#4190a1"}}>
                    Hi {name}, you are almost there! Finish this course strong!
                        </p>

                </div>
            {videocourse}
        </div>

        </div>
       
        </>
       
    );
}












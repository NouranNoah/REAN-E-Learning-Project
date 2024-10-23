
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
    const [name, setName] = useState("");
    const [watchedCourses, setWatchedCourses] = useState([]);
    const videoRef = useRef(null);
    const courseLoggedRef = useRef(false); // لتتبع ما إذا تم تسجيل الكورس
    const cookie = new Cookies();
    const gettoken = cookie.get("Bearer");

    // الحصول على اسم المستخدم
    useEffect(() => {
        const headers = {
            Authorization: `Bearer ${gettoken}`
        };
        axios.get("http://localhost:5000/api/auth/profile", { headers })
            .then(response => {
                setName(response.data.username);
            })
            .catch(error => {
                console.error('Error fetching profile', error);
            });
    }, [gettoken]);

    // الحصول على الكورسات المشاهدة
    useEffect(() => {
        const headers = {
            Authorization: `Bearer ${gettoken}`
        };
        axios.get("http://localhost:5000/api/purchases/my-accessed-courses", { headers })
            .then(response => {
                setWatchedCourses(response.data);
            })
            .catch(error => {
                console.error('Error fetching accessed courses', error);
            });
    }, [gettoken]);

    // الحصول على بيانات الكورس
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

    // التعامل مع فيديو الكورس
    useEffect(() => {
        if (showData.length > 0 && videoRef.current) {
            const player = videojs(videoRef.current, {
                controls: true,
                autoplay: false,
                preload: 'auto',
            });
         
            if (!document.querySelector('.vjs-custom-button')) {
                player.ready(() => {
                    const controlBar = player.controlBar;
                    // Add +3s button
                    const addButton = controlBar.addChild('button', {
                        name: 'add3s',
                        className: 'vjs-custom-button',
                    });
                    addButton.el().innerHTML = `<span class="vjs-icon" aria-hidden="true">+3s</span>`;
                    // Add -3s button
                    const subtractButton = controlBar.addChild('button', {
                        name: 'subtract3s',
                        className: 'vjs-custom-button',
                    });
                    subtractButton.el().innerHTML = `<span class="vjs-icon" aria-hidden="true">-3s</span>`;
                    // Add click event listeners
                    addButton.on('click', () => adjustTime(3));
                    subtractButton.on('click', () => adjustTime(-3));
                });
            }

            player.on('play', () => {
                const courseAlreadyWatched = watchedCourses.some(course => course.id === id);
                if (!courseAlreadyWatched && !courseLoggedRef.current) {
                    saveVideoWatch(id);
                    courseLoggedRef.current = true;
                }
            });

            
            return () => {
            
            };
        }
    }, [showData, id, watchedCourses]);

     const adjustTime = (seconds) => {
        const player = videojs(videoRef.current);
        const newTime = player.currentTime() + seconds;
        player.currentTime(newTime);
    };

    async function saveVideoWatch(idd) {
        const headers = {
            Authorization: `Bearer ${gettoken}`
        };
        try {
            let res = await axios.post(`http://localhost:5000/api/purchases/log-access/${idd}`, {}, { headers });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    const videoCourse = showData.map((course, index) => {
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
                    {/* أزرار التقديم والتأخير */}
                    <div style={{ marginTop: '10px' }}>
                     
                    </div>
                </div>
            </div>
        );
    });

    return (
        <>
            <div className="contwatch">
                <div className="hom-landing">
                    <div className="text">
                        <h3>Sharpen Your Skills With Professional Online Courses</h3>
                        <button className="explore-now">
                            <Link to="/courses" className="link">explore-now</Link>
                        </button>
                    </div>
                </div>
                <div className="cont">
                    <div className="headerwatch" style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                        <span style={{
                            width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "#eee",
                            display: "flex", justifyContent: "center", alignItems: "center"
                        }}>
                            {name.slice(0, 2)}
                        </span>
                        <p style={{ fontWeight: "bold", color: "#4190a1" }}>
                            Hi {name}, you are almost there! Finish this course strong!
                        </p>
                    </div>
                    {videoCourse}
                </div>
            </div>
        </>
    );
}




import {  useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import "./Courses.css";
import Search from "./Search";
import axios from "axios";
import Footer from "../../../components/Footer";
import { Link } from "react-router-dom";
export default function Courses() {
    const [allCourses, setAllCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/courses")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res);
                }
                return res.json();
            })
            .then((data) => {
                setAllCourses(data);
                setFilteredCourses(data);
            })
            .catch((error) => {
                console.error('Error fetching courses:', error);
            });
    }, []);
    console.log(filteredCourses)

    async function handleSearch(word) {
        if (word === "all") {
            setFilteredCourses(allCourses);
        } else {
            try {
                const response = await axios.get(`http://localhost:5000/api/courses/search/${encodeURIComponent(word)}`);
                setFilteredCourses(response.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        }
    }

    function handlePrice(selectPrice) {
        const filterPrice = allCourses.filter((course) => {
            if (selectPrice === "1000") {
                return course.price >= 1000;
            } else if (selectPrice === "-1000") {
                return course.price <= 1000;
            } else {
                return true;
            }
        });

        setFilteredCourses(filterPrice);
    }

    const cards = filteredCourses.map((course) => (
        <div className="cards" key={course._id}>
            <div className="img" style={{ backgroundImage: `url(${course.image})`,  height: "300px", backgroundSize: "cover" }}></div>
            <div className="text">
                <h2>{course.title}</h2>
                <p>{course.description}</p>
                <div className="spans-links" style={{ display: "flex", justifyContent: "space-between" }}>
                    <span  className="price">{course.price}$</span>
                    <Link   className="learn"to={`/details/${course._id}`}>
                        <span>Learn more</span>
                    </Link>
                </div>
            </div>
        </div>
    ));

    return (
        <><div className="coursesnav">
   <Navbar />
        </div>
         
            <Search allCourses={allCourses} handleSearch={handleSearch} handleprice={handlePrice} />
            <div className="courses">
                <div className="cont">
                    {cards}
                </div>
            </div>
            <Footer />
        </>
    );
}



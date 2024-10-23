
import "./Upload.css";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
export default function Uplode() {
    const [addView, setAddView] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('courses');
    const [courses, setCourses] = useState([]);
    const cookies = new Cookies();
    const userId = cookies.get("userId");
    const token = cookies.get("Bearer");
    const [currentCourseId, setCurrentCourseId] = useState(null); 
    const [courseData, setCourseData] = useState({
        title: '',
        description: '',
        image: '',
        category: '',
        price: '',
        video: null,
        learned: ''
    });
    const [name,setname]=useState("")
    const[role,setrole]=useState("")
    useEffect(() => {
        const headers = {
            Authorization: `Bearer ${token}`
        };

        axios.get("http://localhost:5000/api/auth/profile", { headers })
            .then(response => {
                const data = response.data;
                setrole(response.data.role);
                setname(response.data.username)
            
       
            })
            .catch(error => {
                console.error('Error fetching profile', error);
            });
    }, [token]);
    

    useEffect(() => {
        if (userId) {
            getCourses(userId);
        }
    }, [userId]);

    const handleChange = (e) => {
        setCourseData({ ...courseData, [e.target.name]: e.target.value });
    };

    const handleUpload = async () => {
        const formData = new FormData();
        for (const key in courseData) {
            formData.append(key, courseData[key]);
        }
        console.log('Form Data:', Array.from(formData.entries()));
        try {
            if (isEditing) {
                const currentCourse = courses.find(course => course._id === currentCourseId);
                if (!courseData.video) {
                    formData.append('video', currentCourse.video);
                }
                await axios.put(`http://localhost:5000/api/courses/${currentCourseId}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('Course updated:', courseData);
                setCourses(prevCourses => 
                    prevCourses.map(course => 
                        course._id === currentCourseId ? { ...course, ...courseData } : course
                    )
                );
            } else {
                const res = await axios.post('http://localhost:5000/api/courses', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('Course created:', res.data);
                setCourses(prevCourses => [...prevCourses, res.data]);
            }

            setCourseData({
                title: '',
                description: '',
                image: '',
                category: '',
                price: '',
                video: null,
                learned: ''
            });

            setAddView(false);
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving course:', error.response.data);
        }
    };

    const getCourses = async (userId) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/courses/instructor/${userId}`);
            setCourses(res.data); 
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const getDelete = async (courseId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this course?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:5000/api/courses/${courseId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            await getCourses(userId);
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };
    return (
        <div className='content'>
        {activeTab === 'courses' && !addView && (
            <div className="courseBox">
                <div className="add" onClick={() => { 
                    setAddView(true); 
                    setIsEditing(false); 
                    setCurrentCourseId(null); 
                    setCourseData({ title: '', description: '', image: '', category: '', price: '', video: null, learned: '' }); 
                }}>
                    <i className="fa-solid fa-plus"></i> Add a new course
                </div>
                <div className='courses'>
                    <h3>Your Courses</h3>
                    <div className='allCourses'>
                        {courses.length > 0 ? (
                            courses.map(course => (
                                <div key={course._id} className='course-item'>
                                    <div className='courseIcons'>
                                        <i className="fa-solid fa-pen-to-square" onClick={() => { 
                                            setIsEditing(true); 
                                            setCurrentCourseId(course._id); 
                                            setCourseData({ 
                                                title: course.title, 
                                                description: course.description, 
                                                image: course.image, 
                                                category: course.category, 
                                                price: course.price, 
                                                video: course.video,
                                                learned: course.learned 
                                            }); 
                                            setAddView(true); 
                                        }}></i>
                                        <i className="fa-solid fa-trash-can" onClick={() => { getDelete(course._id); }}></i>
                                    </div>
                                    <h4>{course.title}</h4>
                                    {course.video && (
                                        <video width="320" height="240" controls>
                                            <source src={`http://localhost:5000/${course.video}`} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    )}
                                    <p>{course.description}</p>
                                    <p>Category: <span>{course.category}</span></p>
                                    <p>Price: <span>{course.price}</span></p>
                                </div>
                            ))
                        ) : (
                            <p>No courses available.</p>
                        )}
                    </div>
                </div>
            </div>
        )}
        {addView && (
            <div className='addCourse'>
                <h2>{isEditing ? 'Edit Course' : 'Add New Course'}</h2>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={courseData.title}
                    onChange={handleChange}
                    className="input-field"
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={courseData.description}
                    onChange={handleChange}
                    className="textarea-field"
                />
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={courseData.image}
                    onChange={handleChange}
                    className="input-field"
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={courseData.category}
                    onChange={handleChange}
                    className="input-field"
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={courseData.price}
                    onChange={handleChange}
                    className="input-field"
                />
                <input
                    type="file"
                    name="video"
                    accept="video/*"
                    onChange={(e) => {
                        setCourseData({ ...courseData, video: e.target.files[0] });
                    }}
                    className="file-input"
                />
                <textarea
                    name="learned"
                    placeholder="What you learned"
                    value={courseData.learned}
                    onChange={handleChange}
                    className="textarea-field"
                />
                <div className='btn-container'>
                    <button onClick={handleUpload} className="submit-btn">
                        {isEditing ? 'Update' : 'Upload'}
                    </button>
                    <button onClick={() => setAddView(false)} className="cancel-btn">Cancel</button>
                </div>
            </div>
        )}
    </div>
       
    )
    
}


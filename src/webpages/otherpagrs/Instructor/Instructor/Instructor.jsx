import React, { useState, useEffect } from 'react';
import './instructor.css';
import axios from 'axios';
import { useAuth } from '../../../Context/Usercontext';
import { useNavigate } from 'react-router-dom';

export default function Instructor() {
    const { token ,setToken } = useAuth(); 
    const [activeTab, setActiveTab] = useState('courses');
    const [user, setUser] = useState(null);
    const [addView, setAddView] = useState(false);
    const [userId, setUserId] = useState('');
    const [courses, setCourses] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentCourseId, setCurrentCourseId] = useState(null);
    const Navigate= useNavigate();

    const [courseData, setCourseData] = useState({
        title: '',
        description: '',
        image: '',
        category: '',
        price: '',
        video: null
    });

    const getUserData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/auth/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUser(res.data);
            setUserId(res.data._id);
            await getCourses(res.data._id);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const getCourses = async (userId) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/courses/instructor/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCourses(res.data); 
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleChange = (e) => {
        setCourseData({ ...courseData, [e.target.name]: e.target.value });
    };

    const handleUpload = async () => {
        const formData = new FormData();
        for (const key in courseData) {
            formData.append(key, courseData[key]);
        }

        try {
            if (isEditing) {
                if (!courseData.video) {
                    const currentCourse = courses.find(course => course._id === currentCourseId);
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
                video: null
            });

            setAddView(false);
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving course:', error);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    const getEdit = (courseId) => {
        const courseToEdit = courses.find(course => course._id === courseId);
        if (courseToEdit) {
            setCourseData({
                title: courseToEdit.title,
                description: courseToEdit.description,
                image: courseToEdit.image,
                category: courseToEdit.category,
                price: courseToEdit.price,
                video: courseToEdit.video 
            });
            setCurrentCourseId(courseId);
            setIsEditing(true);
            setAddView(true); 
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
            console.log('Course deleted:', courseId);
            await getCourses(userId);
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    const logOut = ()=>{
        setToken(null);
        Navigate('/login')
    }

    return (
        <div className='instructor'>
            <div className='profile'>
                <h3>Hello :)</h3>
                <ul>
                    <li onClick={() => setActiveTab('courses')}>Courses</li>
                    <li onClick={() => setActiveTab('data')}>Your data</li>
                    <li>Tasks</li>
                </ul>
                <div>
                    <a href="#">Settings</a>
                    <a href="#" onClick={logOut}>Logout</a>
                </div>
            </div>

            <div className='content'>
                {activeTab === 'courses' && !addView && (
                    <>
                        <div className='searchinput'>
                            <input type="text" placeholder='Search Your Courses Here' />
                            <div onClick={() => { 
                                setAddView(true); 
                                setIsEditing(false); 
                                setCourseData({ title: '', description: '', image: '', category: '', price: '', video: null }); 
                            }}><i className="fa-solid fa-plus"></i> Add a new course</div>
                        </div>
                        <div className='search'></div>
                        <div className='courses'>
                            <h3>Your Courses</h3>
                            <div className='allCourses'>
                                {courses.length > 0 ? (
                                    courses.map(course => (
                                        <div key={course._id} className='course-item'>
                                            <div className='courseIcons'>
                                                <i className="fa-solid fa-pen-to-square" onClick={() => { getEdit(course._id); }}></i>
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
                    </>
                )}

                {activeTab === 'data' && user && (
                    <div className='data'>
                        <h3>Your Data</h3>
                        <div className='data-item'>
                            <strong>Username:</strong> <span>{user.username}</span>
                        </div>
                        <div className='data-item'>
                            <strong>Email:</strong> <span>{user.email}</span>
                        </div>
                        <div className='data-item'>
                            <strong>Role:</strong> <span>{user.role}</span>
                        </div>
                        <div className='data-item'>
                            <strong>Purchased Courses:</strong> <span>{user.purchasedCourses.length > 0 ? user.purchasedCourses.join(', ') : 'No courses purchased'}</span>
                        </div>
                    </div>
                )}
            </div>

            {addView && (
                <div className='addCourse'>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={courseData.title}
                        onChange={handleChange}
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={courseData.description}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="image"
                        placeholder="Image URL"
                        value={courseData.image}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={courseData.category}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={courseData.price}
                        onChange={handleChange}
                    />
                    <input
                        type="file"
                        name="video"
                        accept="video/*" 
                        onChange={(e) => {
                            setCourseData({ ...courseData, video: e.target.files[0] });
                        }}
                    />

                    <div className='btn'>
                        <button onClick={handleUpload}>{isEditing ? 'Update' : 'Upload'}</button>
                        <button onClick={() => setAddView(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}

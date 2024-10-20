import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import "./Myprofile.css";
import { FaEdit } from "react-icons/fa";
import Navbar from "./Navbar";
import Homeprofile from "./Homeprofile";

export default function Myprofile() {
    const cookie = new Cookies();
    const gettoken = cookie.get("Bearer");
    console.log(gettoken);
    const [update, setupdate] = useState(false)
    const [isedit, setisedit] = useState(false);
    const [form, setform] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [originalData, setOriginalData] = useState([]); 
 

    useEffect(() => {
        const headers = {
            Authorization: `Bearer ${gettoken}`
        };

        axios.get("http://localhost:5000/api/auth/profile", { headers })
            .then(response => {
                const data = response.data;
                setform({
                    username: data.username,
                    email: data.email,
                    password: data.password
                });
                setOriginalData({
                    username: data.username,
                    email: data.email,
                    password: data.password
                }); //  to store the orgin data without change
       
            })
            .catch(error => {
                console.error('Error fetching profile', error);
            });
    }, [gettoken]);
    console.log(originalData)

    console.log(form);

    function handleedit() {
        setisedit(true);
    }

    function handlechange(e) {
        setform({ ...form, [e.target.name]: e.target.value });
    }

    async function handlesubmit(e) {
        e.preventDefault();
        const updatedData = {};
        if (form.username !== originalData.username) updatedData.username = form.username;
        if (form.email !== originalData.email) updatedData.email = form.email;
        if (form.password !== originalData.password) updatedData.password = form.password;

        if (Object.keys(updatedData).length > 0) {
            const headers = {
                Authorization: `Bearer ${gettoken}`
            };
            try {
                await axios.put("http://localhost:5000/api/auth/update", updatedData, { headers });
                console.log('Profile updated:', updatedData);
                setOriginalData(form); 
                setupdate(true)
                setisedit(false)
                setTimeout(() => {
                    setupdate(false);
                }, 3000); 
            } catch (error) {
                console.error('Error updating profile', error);
            }
        } else {
           console.log("no data update")
        }
    }

 
  

    return (
        <>
                
                <div className="al">
            
            <div className="usercircle">
            <>
            <div className="circle">
       
                        <h3>
{originalData.username ? originalData.username.slice(0, 2) : form.username.slice(0,2)}
</h3>

            </div>
            <div className="username">
                <p>{originalData.username}</p>
                <span> student at rean</span>
            </div>
        </>
            </div>
            <div className="myprofile">
                <div className="data-user">
                <form className="myaccount" onSubmit={handlesubmit}>
            <div className="username">
                <label> user name :</label>
                <input value={ form.username } name="username" type="text" disabled={!isedit} onChange={handlechange} />
            </div>
            <div className="email">
                <label> email :</label>
                <input value={ form.email } name="email" type="email" disabled={!isedit} onChange={handlechange} />
            </div>
            <div className="password">
                <label> password :</label>
                <input value={ form.password } type="password" name="password" disabled={!isedit} onChange={handlechange} />
            </div>
            {update  && <p className="sucsess" style={{color:"green"}}> Your changes have been saved successfully !</p> }
            <button type="submit" disabled={!isedit}>
                change now
            </button>
        </form>
                </div>
                <div className="action">
                    <span onClick={handleedit} className="edit">
                        <FaEdit /> change now
                    </span>
                </div>
            </div>
        </div>
        </>
   
      
       
    );
}


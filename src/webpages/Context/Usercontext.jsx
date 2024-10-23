import  { createContext, useState, useContext } from 'react';
import axios from 'axios';
import Cookies from "universal-cookie";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // const [token, setToken] = useState(null);
    const cookie = new Cookies();
    const [errorMessages, setErrorMessages] = useState('');

    const sendSignToApi = async (userData) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/signup', userData);
            return res.data;
        } catch (error) {
            handleError(error);
            throw error;
        }
    };

    const loginToApi = async (email, password) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            const token = res.data.token;
            const userId =res.data._id
            cookie.set("Bearer", token)
            cookie.set("userId", userId);
            return res.data;
        } catch (error) {
            handleError(error);
            throw error;
        }
    };

    const handleError = (error) => {
        if (error.response) {
            setErrorMessages(error.response.data.message);
        } else {
            setErrorMessages('Something went wrong. Please try again.');
        }
    };

    return (
        <UserContext.Provider value={{  sendSignToApi, loginToApi, errorMessages }}>
            {children}
        </UserContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(UserContext);
};
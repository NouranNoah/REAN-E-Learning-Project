import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [token, setToken] = useState(null);
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
            setToken(res.data.token);
            localStorage.setItem('token', res.data.token);
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
        <UserContext.Provider value={{ token,setToken, sendSignToApi, loginToApi, errorMessages }}>
            {children}
        </UserContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(UserContext);
};

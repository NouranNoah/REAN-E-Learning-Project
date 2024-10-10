
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [errorMessages, setErrorMessages] = useState('');

    const sendSignToApi = async (user) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/signup', user);
            setToken(res.data.token);
            localStorage.setItem('token', res.data.token);
            return res.data;
        } catch (error) {
            if (error.response) {
                setErrorMessages({ general: error.response.data.message });
            } else {
                setErrorMessages({ general: 'Something went wrong. Please try again.' });
            }
            throw error; 
        }
    };

    return (
        <UserContext.Provider value={{ token, sendSignToApi, errorMessages }}>
            {children}
        </UserContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(UserContext);
};
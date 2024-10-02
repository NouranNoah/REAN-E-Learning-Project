import React, { useState, createContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userName, setUserName] = useState('');

    const signup = async (userData) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/signup', userData);
            setUserName(userData.username);
            return null; 
        } catch (error) {
            if (error.response) {
                return error.response; 
            } else {
                console.error('Error signing up:', error);
                return { status: 500 }; 
            }
        }
    };
    
    

    return (
        <AuthContext.Provider value={{ userName, signup }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return React.useContext(AuthContext);
};

import  { createContext, useState, useContext } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [errorMessages, setErrorMessages] = useState('');

    const handleError = (error) => {
        if (error.response) {
            setErrorMessages(error.response.data.message);
        } else {
            setErrorMessages('Something went wrong. Please try again.');
        }
    };

    const loginToApi = async (email, password) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            setToken(res.data.token);
            setUser(res.data.user);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            return res.data;
        } catch (error) {
            handleError(error);
            throw error;
        }
    };

    return (
        <UserContext.Provider value={{ token, user, loginToApi, errorMessages }}>
            {children}
        </UserContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(UserContext);
};
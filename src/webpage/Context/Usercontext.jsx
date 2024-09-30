import React, { useState, createContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userName, setUserName] = useState('');

    const signup = (newUserName) => {
        // لسه هحط لينك API
        setUserName(newUserName);
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

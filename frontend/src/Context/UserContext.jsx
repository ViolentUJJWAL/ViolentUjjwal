import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    const storeUserData = async (data) => {
        setUserData(data);
    };

    return (
        <UserContext.Provider value={{storeUserData, userData}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useAdmin must be used within an UserProvider');
    }
    return context;
};
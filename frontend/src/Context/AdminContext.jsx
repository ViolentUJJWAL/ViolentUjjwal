import React, { createContext, useContext, useState } from 'react';

const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
    const [adminData, setAdminData] = useState(null);

    const storeAdminData = async (data) => {
        setAdminData(data);
    };

    return (
        <AdminContext.Provider value={{storeAdminData, adminData}}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
};
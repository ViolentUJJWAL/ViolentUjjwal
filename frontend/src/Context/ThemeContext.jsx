// src/components/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

    const [activeTheme, setActiveTheme] = useState("#06b6d4");
    const [particleValue, setParticleValue] = useState(260);
    const [particleIsConnect, setParticleIsConnect] = useState({color: activeTheme, distance: 150, enable: true, opacity: 0.5, width: 1});

    const changeTheme = (theme) => {
        setActiveTheme(theme);
        if(particleIsConnect !== null){
            setParticleIsConnect({color: theme, distance: 150, enable: true, opacity: 0.5, width: 1})
        }
    };

    const changeParticleIsConnect = (bool) => {
        if(bool){
            setParticleIsConnect({color: activeTheme, distance: 150, enable: true, opacity: 0.5, width: 1})
        }else{
            setParticleIsConnect(null)
        }
    };

    const changeParticleValue = (value) =>{
        setParticleValue(value)
    }

    return (
        <ThemeContext.Provider value={{ activeTheme, particleIsConnect, particleValue, changeParticleValue, changeTheme, changeParticleIsConnect }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);

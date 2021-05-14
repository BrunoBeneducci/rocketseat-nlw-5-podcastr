import { createContext, useContext, useEffect, useState } from 'react';

type ThemeContextData = {
    darkMode: boolean;
    toggleDarkMode: () => void;
    checkBrowserTheme: () => void;
};

export const ThemeContext = createContext({} as ThemeContextData);

export function ThemeContextProvider({ children }) {

    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const checkBrowserTheme = () => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setDarkMode(true);
        }
    }

    useEffect(() => {
        checkBrowserTheme();
    }, []);

    useEffect(() => {
        if(darkMode) {
            document.querySelector('body').classList.add('themeDark');
        } else {
            document.querySelector('body').classList.remove('themeDark');
        }
    }, [darkMode]);


    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode, checkBrowserTheme }}>
            { children }
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    return useContext(ThemeContext);
}
import { createContext, useContext, useEffect, useState } from 'react';

type LoaderContextData = {
    statusLoader: boolean;
    changeLoaderTrue: () => void;
    changeLoaderFalse: () => void;
};

export const LoaderContext = createContext({} as LoaderContextData);

export function LoaderContextProvider({ children }) {

    const [statusLoader, setStatusLoader] = useState(false);

    const changeLoaderTrue = () => {
        setStatusLoader(true);
    };
    
    const changeLoaderFalse = () => {
        setStatusLoader(false);
    };

    return (
        <LoaderContext.Provider value={{ statusLoader, changeLoaderTrue, changeLoaderFalse }}>
            { children }
        </LoaderContext.Provider>
    )
}

export const useLoader = () => {
    return useContext(LoaderContext);
}
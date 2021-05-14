import { createContext, useContext, useEffect, useState } from 'react';

type Episode = {
    id: string;
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
};

type FavoriteContextData = {
    favoriteList: Episode[];
    currentFavoriteIndex: number;
    updateFavotireList: (favoriteList, currentFavoriteIndex) => void;
    checkFavoriteItem: (episodeId) => false;
};

export const FavoriteContext = createContext({} as FavoriteContextData);

export function FavoriteContextProvider({ children }) {

    const [favoriteList, setFavoriteList] = useState([]);
    const [currentFavoriteIndex, setCurrentFavoriteIndex] = useState(0);

    const updateFavotireList = (params) => {
        if (favoriteList.find(el => el.id === params.id)) {
            setFavoriteList(favoriteList.filter(el => el.id !== params.id));
        } else {
            setFavoriteList(oldArray => [...oldArray, params]);
        }
    }

    const checkFavoriteItem = (params) => {
        return favoriteList.find(el => el.id === params);
    }

    return (
        <FavoriteContext.Provider value={{ favoriteList, currentFavoriteIndex, updateFavotireList, checkFavoriteItem }}>
            { children }
        </FavoriteContext.Provider>
    )
}

export const useFavorite = () => {
    return useContext(FavoriteContext);
}
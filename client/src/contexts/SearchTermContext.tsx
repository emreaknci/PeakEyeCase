import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



export const SearchContext = createContext({
    searchTerm: '',
    setSearchTerm: (searchTerm: string) => { },
    isClicked: false,
    setIsClicked: (isClicked: boolean) => { }
});

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isClicked, setIsClicked] = useState<boolean>(false);

    useEffect(() => {
        if (isClicked && searchTerm) {
            navigate(`/`);
            setIsClicked(false);
        }
    }, [isClicked, searchTerm, navigate]);


    return (
        <SearchContext.Provider value={{ searchTerm, setSearchTerm, isClicked, setIsClicked }}>
            {children}
        </SearchContext.Provider>
    );
};
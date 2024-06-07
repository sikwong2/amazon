import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/router';

interface SearchContextProps {
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
    handleSearch: () => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [searchValue, setSearchValue] = useState('');
    const router = useRouter();

    const handleSearch = () => {
        setSearchValue(searchValue.trim());
        router.push(`/search?query=${encodeURIComponent(searchValue.trim())}`);  
    };

    return (
        <SearchContext.Provider value={{ searchValue, setSearchValue, handleSearch }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
};

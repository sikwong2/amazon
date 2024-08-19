import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/router';

export const SearchContext = createContext({
    searchValue: '',
    setSearchValue: (searchValue: string) => {},
    handleSearch: (newSearchValue?: string) => {}
});

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [searchValue, setSearchValue] = useState('');
    const router = useRouter();

    const handleSearch = (newSearchValue?: string) => {
        const newValue = newSearchValue || searchValue;
        setSearchValue(newValue.trim());
        router.push(`/search?query=${encodeURIComponent(newValue.trim())}`);  
    };

    return (
        <SearchContext.Provider value={{ searchValue, setSearchValue, handleSearch }}>
            {children}
        </SearchContext.Provider>
    );
};


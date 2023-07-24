'use client'
import React, { useState } from 'react';

interface IGlobalContextProps {
    layout: any;
    loading: boolean;
    setLayout: (layout: any) => void;
    setLoading: (loading: boolean) => void;
}

export const GlobalContext = React.createContext<IGlobalContextProps>({
    layout: [],
    loading: true,
    setLayout: () => { },
    setLoading: () => { },
});

export const GlobalContextProvider = (props: any) => {
    const [currentLayout, setCurrentLayout] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <GlobalContext.Provider
            value={{
                layout: currentLayout,
                loading: isLoading,
                setLayout: setCurrentLayout,
                setLoading: setIsLoading,
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
};
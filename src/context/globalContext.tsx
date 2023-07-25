'use client'
import React, { useState } from 'react';

interface IGlobalContextProps {
    layout: any;
    dashboard: any,
    loading: boolean;
    setLayout: (layout: any) => void;
    setDashboard: (dashboard: any) => void;
    setLoading: (loading: boolean) => void;
}

export const GlobalContext = React.createContext<IGlobalContextProps>({
    layout: [],
    dashboard: {},
    loading: true,
    setLayout: () => { },
    setDashboard: () => { },
    setLoading: () => { },
});

export const GlobalContextProvider = (props: any) => {
    const [currentLayout, setCurrentLayout] = useState([]);
    const [savedDashboard, setSavedDashboard] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    return (
        <GlobalContext.Provider
            value={{
                layout: currentLayout,
                dashboard: savedDashboard,
                loading: isLoading,
                setLayout: setCurrentLayout,
                setDashboard: setSavedDashboard,
                setLoading: setIsLoading,
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
};
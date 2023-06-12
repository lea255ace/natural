'use client';

import { createContext, useContext, useReducer } from "react";

const initialConfigValues = {
    latitude: 40,
    longitude: -74
};

const Context = createContext();

export function ConfigProvider({ children }) {
    const [configValues, updateConfigValues] = useReducer(
        (configValues, updates) => ({ ...configValues, ...updates }),
        initialConfigValues
    );

    return (
        <Context.Provider value={[configValues, updateConfigValues]}>{children}</Context.Provider>
    );
}

export function useConfigContext() {
    return useContext(Context);
}
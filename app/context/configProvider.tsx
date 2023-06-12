'use client'

import { createContext, useContext, useReducer } from "react";

const initialConfigValues = {
    latitude: 40,
    longitude: -74
};

export const ConfigContext = createContext({})

export function ConfigProvider({ children }) {
    const [configValues, updateConfigValues] = useReducer(
        (configValues, updates) => ({ ...configValues, ...updates }),
        initialConfigValues
    );

    return (
        <ConfigContext.Provider value={[configValues, updateConfigValues]}>{children}</ConfigContext.Provider>
    );
}

export function useConfigContext() {
    return useContext(ConfigContext);
}
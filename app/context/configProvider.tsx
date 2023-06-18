'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type ConfigParameters = {
    latitude: number;
    longitude: number;
};

type ConfigContextType = {
    configValues: ConfigParameters;
    updateConfig: (newValues: ConfigParameters) => void;
}

const ConfigContext = createContext<ConfigContextType>({} as ConfigContextType);

export function ConfigProvider({ children }) {
    const defaultConfigValues: ConfigParameters = {
        latitude: 40,
        longitude: -74
    };
    const [configValues, setConfigValues] = useState<ConfigParameters>(defaultConfigValues);

    useEffect(() => {
        const localConfigString = localStorage.getItem('configValues');
        if (typeof localConfigString === 'string') {
            setConfigValues(JSON.parse(localConfigString));
        }
    }, []);

    const updateConfig = (newValues: ConfigParameters) => {
        setConfigValues(newValues);
        localStorage.setItem('configValues', JSON.stringify(newValues));
    };

    return (
        <ConfigContext.Provider value={{ configValues, updateConfig }}>{children}</ConfigContext.Provider>
    );
}

export function useConfigContext() {
    return useContext(ConfigContext);
}
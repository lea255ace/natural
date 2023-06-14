'use client';

import { createContext, useContext, useState } from 'react';

export type ConfigParameters = {
    latitude: number;
    longitude: number;
};

type ConfigContextType = {
    configValues: ConfigParameters;
    updateConfig: (newValues: ConfigParameters) => void;
}

const initialConfigValues: ConfigParameters = {
    latitude: 40,
    longitude: -74
};

const ConfigContext = createContext<ConfigContextType>({} as ConfigContextType);

export function ConfigProvider({ children }) {
    const [configValues, setConfigValues] = useState<ConfigParameters>(initialConfigValues);
    const updateConfig = (newValues: ConfigParameters) => {
        setConfigValues(newValues);
    };

    return (
        <ConfigContext.Provider value={{ configValues, updateConfig }}>{children}</ConfigContext.Provider>
    );
}

export function useConfigContext() {
    return useContext(ConfigContext);
}
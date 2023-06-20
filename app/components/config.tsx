'use client';

import { useState, useEffect } from 'react';
import { ConfigParameters, useConfigContext } from 'context/configProvider';

type DisplayedParameters = {
    latitude: string;
    longitude: string;
};

export default function Config({ className }) {
    const {configValues, updateConfig} = useConfigContext();
    const [displayedValues, setDisplayedValues] = useState<DisplayedParameters>(translateConfigValues(configValues));

    function translateConfigValues(configValues: ConfigParameters) {
        return { latitude: configValues.latitude.toString(), longitude: configValues.longitude.toString() };
    }

    function updateConfigValues(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const parameters = {} as ConfigParameters;
        for (const [k, v] of formData.entries()) {
            parameters[k] = parseFloat(v as string);
        }
        updateConfig(parameters);
    }

    useEffect(() => {
        setDisplayedValues(translateConfigValues(configValues));
    }, [configValues]);

    return (
        <div className={`${className}`}>
            <form onSubmit={updateConfigValues}>
                <label>Latitude:
                    <input name='latitude' value={displayedValues.latitude}
                        onChange={e => setDisplayedValues({...displayedValues, latitude: e.target.value})}
                    />
                </label>
                <br />
                <label>Longitude:
                    <input name='longitude' value={displayedValues.longitude}
                        onChange={e => setDisplayedValues({...displayedValues, longitude: e.target.value})}
                    />
                </label>
                <br />
                <button type='reset'>Reset</button>
                <button type='submit'>Update</button>
            </form>
            <p>Current Latitude: {Math.abs(configValues.latitude) + ' ' + ((configValues.latitude > 0) ? 'N' : 'S')}</p>
            <p>Current Longitude: {Math.abs(configValues.longitude) + ' ' + ((configValues.longitude > 0) ? 'E' : 'W')}</p>
        </div>
    );
}
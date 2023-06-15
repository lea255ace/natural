import { ConfigParameters, useConfigContext } from 'context/configProvider';

export default function Config({ className }) {
    const {configValues, updateConfig} = useConfigContext();

    function updateValues(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const parameters = {} as ConfigParameters;
        for (const [k, v] of formData.entries()) {
            parameters[k] = v;
        }
        updateConfig(parameters);
    }

    return (
        <div className={`${className}`}>
            <form onSubmit={updateValues}>
                <label>
                    Latitude: <input name='latitude' defaultValue={configValues.latitude} />
                </label>
                <br />
                <label>
                    Longitude: <input name='longitude' defaultValue={configValues.longitude} />
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
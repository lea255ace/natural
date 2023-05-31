import { useConfigContext } from "../context/configProvider";

export default function Config() {
  const [configValues, updateConfigValues] = useConfigContext();

  function updateValues(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    var parameters = {};
    for (const pair of formData.entries()) {
      parameters[pair[0]] = pair[1];
    }
    updateConfigValues(parameters);
  }

  return (
    <>
      <form  onSubmit={updateValues}>
        <label>
          Latitude: <input name="latitude" defaultValue={configValues.latitude} />
        </label>
        <br />
        <label>
          Longitude: <input name="longitude" defaultValue={configValues.longitude} />
        </label>
        <br />
        <button type="reset">Reset</button>
        <button type="submit">Update</button>
      </form>
      <p>Current Latitude: {Math.abs(configValues.latitude) + " " + ((configValues.latitude > 0) ? "N" : "S")}</p>
      <p>Current Longitude: {Math.abs(configValues.longitude) + " " + ((configValues.longitude > 0) ? "E" : "W")}</p>
    </>
  );
}
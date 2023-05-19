import Head from 'next/head';
import { useConfigContext } from "../context/configProvider";

export default function Home() {
  const [configValues, updateConfigValues] = useConfigContext();

  return (
    <>
      <Head>
        <title>Natural Time</title>
      </Head>
      <h1>Natural Time!</h1>
      <p>Current Latitude: {Math.abs(configValues.latitude) + " " + ((configValues.latitude > 0) ? "N" : "S")}</p>
      <p>Current Longitude: {Math.abs(configValues.longitude) + " " + ((configValues.longitude > 0) ? "E" : "W")}</p>
    </>
  );
}

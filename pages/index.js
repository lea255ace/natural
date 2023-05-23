import Head from 'next/head';
import Clock from '../components/clock'
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
      <Clock
        civilTimeMinutes={328}
        civilTimeOffsetMinutes={41.23}
        currentDaylightMinutes={805}
        maxDaylightMinutes={867}
      />
    </>
  );
}

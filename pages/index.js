import Head from 'next/head';
import Clock from '../components/clock'
import { useConfigContext } from "../context/configProvider";
import { useState, useEffect } from 'react';

export default function Home() {
  let initialDate = new Date();
  const initialMinutes = (initialDate.getHours() * 60) + initialDate.getMinutes();
  const [configValues, updateConfigValues] = useConfigContext();
  const [currentTimeMinutes, setCurrentTimeMinutes] = useState(initialMinutes);

  useEffect(() => {
    const tick = setInterval(() => {
      let newDate = new Date();
      let newTimeMinutes = (newDate.getHours() * 60) + newDate.getMinutes();
      setCurrentTimeMinutes(newTimeMinutes);
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  return (
    <>
      <Head>
        <title>Natural Time</title>
      </Head>
      <h1>Natural Time!</h1>
      <p>Current Latitude: {Math.abs(configValues.latitude) + " " + ((configValues.latitude > 0) ? "N" : "S")}</p>
      <p>Current Longitude: {Math.abs(configValues.longitude) + " " + ((configValues.longitude > 0) ? "E" : "W")}</p>
      <Clock
        civilTimeMinutes={currentTimeMinutes}
        civilTimeOffsetMinutes={41.23}
        currentDaylightMinutes={805}
        maxDaylightMinutes={867}
      />
    </>
  );
}

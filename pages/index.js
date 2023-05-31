import Head from 'next/head';
import Clock from '../components/clock'
import { useConfigContext } from "../context/configProvider";
import { useState, useEffect } from 'react';
import astro_algo from '@lea255ace/astro_algo';

export default function Home() {
  let initialDate = new Date();
  const initialMinutes = (initialDate.getHours() * 60) + initialDate.getMinutes();
  const [configValues, updateConfigValues] = useConfigContext();
  const [currentTimeMinutes, setCurrentTimeMinutes] = useState(initialMinutes);

  //TODO(MW): This should be hoisted into a utility module
  // Calculations provided at https://gml.noaa.gov/grad/solcalc/solareqns.pdf
  const declination = astro_algo.calculateDeclinationRadians(initialDate);
  const eqTime = astro_algo.calculateEqTimeMinutes(initialDate);
  //NB: Date.getTimezoneOffset returns an offset in minutes, with the opposite sign as the timezone.
  const timeOffsetMinutes = eqTime + 4 * configValues.longitude + initialDate.getTimezoneOffset();
  const sunriseHourAngleDegrees = astro_algo.calculateSunriseHourAngleDegrees(configValues.latitude, declination);
  const sunriseTimeMinutes = 720 - 4 * (configValues.longitude + sunriseHourAngleDegrees) - eqTime;
  const sunsetTimeMinutes = 720 - 4 * (configValues.longitude - sunriseHourAngleDegrees) - eqTime;
  const daylightMinutes = sunsetTimeMinutes - sunriseTimeMinutes;

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
        civilTimeOffsetMinutes={timeOffsetMinutes}
        currentDaylightMinutes={daylightMinutes}
        maxDaylightMinutes={867}
      />
    </>
  );
}

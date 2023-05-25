import Head from 'next/head';
import Clock from '../components/clock'
import { useConfigContext } from "../context/configProvider";
import { useState, useEffect } from 'react';

export default function Home() {
  let initialDate = new Date();
  const initialMinutes = (initialDate.getHours() * 60) + initialDate.getMinutes();
  const [configValues, updateConfigValues] = useConfigContext();
  const [currentTimeMinutes, setCurrentTimeMinutes] = useState(initialMinutes);

  //TODO(MW): This should be hoisted into a utility module
  // Calculations provided at https://gml.noaa.gov/grad/solcalc/solareqns.pdf
  const fractionalYear = calculateFractionalYear(initialDate);
  const declination = calculateDeclination(fractionalYear);
  const eqTime = calculateEqTime(fractionalYear);
  const sunriseHourAngleDegrees = calculateSunriseHourAngleDegrees(configValues.latitude, declination);
  const sunriseTimeMinutes = 720 - 4 * (configValues.longitude + sunriseHourAngleDegrees) - eqTime;
  const sunsetTimeMinutes = 720 - 4 * (configValues.longitude - sunriseHourAngleDegrees) - eqTime;
  const daylightMinutes = sunsetTimeMinutes - sunriseTimeMinutes;

  function calculateFractionalYear(date) {
    const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const hour = date.getHours() + (date.getMinutes() / 60);

    return (2 * Math.PI) * (dayOfYear - 1 + (hour - 12)/24) / 365;
  }

  function calculateEqTime(fractionalYear) {
    return 0.006918 - 0.399912 * Math.cos(fractionalYear) + 0.070257 * Math.sin(fractionalYear)
                    - 0.006758 * Math.cos(2 * fractionalYear) + 0.000907 * Math.sin(2 * fractionalYear)
                    - 0.002697 * Math.cos(3 * fractionalYear) + 0.00148 * Math.sin (3 * fractionalYear);
  }

  function calculateDeclination(fractionalYear) {
    return 0.006918 - 0.399912 * Math.cos(fractionalYear) + 0.070257 * Math.sin(fractionalYear)
                    - 0.006758 * Math.cos(2 * fractionalYear) + 0.000907 * Math.sin(2 * fractionalYear)
                    - 0.002697 * Math.cos(3 * fractionalYear) + 0.00148 * Math.sin (3 * fractionalYear);

  }

  function calculateSunriseHourAngleDegrees(latitude, declination) {
    const solarZenithRadians = 90.833 * 2 * Math.PI / 360;
    const latitudeRadians = latitude * 2 * Math.PI / 360;
    const hourAngleRadians =  Math.acos( Math.cos(solarZenithRadians) / (Math.cos(latitudeRadians) * Math.cos(declination)) - Math.tan(latitudeRadians) * Math.tan(declination) );
    return hourAngleRadians * 360 / (2 * Math.PI);
  }

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
        currentDaylightMinutes={daylightMinutes}
        maxDaylightMinutes={867}
      />
    </>
  );
}

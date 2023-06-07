import Head from 'next/head';
import Config from '../components/config'
import Clock from '../components/clock'
import styles from './index.module.css'
import { useConfigContext } from "../context/configProvider";
import { useState, useEffect } from 'react';
import astro_algo from '@lea255ace/astro_algo';

export default function Home() {
  let initialDate = new Date();
  const [configValues, updateConfigValues] = useConfigContext();
  const [currentDate, setCurrentDate] = useState(initialDate);

  const declination = astro_algo.calculateDeclinationRadians(initialDate);
  const eqTime = astro_algo.calculateEqTimeMinutes(initialDate);

  //NB: Date.getTimezoneOffset returns an offset in minutes, with the opposite sign as the timezone.
  const timeOffsetMinutes = eqTime + 4 * configValues.longitude + initialDate.getTimezoneOffset();

  const sunriseHourAngleDegrees = astro_algo.calculateSunriseHourAngleDegrees(configValues.latitude, declination);
  //const sunriseTimeMinutes = 720 - 4 * (configValues.longitude + sunriseHourAngleDegrees) - eqTime;
  //const sunsetTimeMinutes = 720 - 4 * (configValues.longitude - sunriseHourAngleDegrees) - eqTime;
  const daylightMinutes = 8 * sunriseHourAngleDegrees;

  const summerSolsticeDate = astro_algo.calculateQuarterDayForYear(astro_algo.QuarterDays.SummerSolstice, currentDate.getFullYear());
  const solsticeDeclination = astro_algo.calculateDeclinationRadians(summerSolsticeDate);
  const solsticeSunriseHourAngleDegrees = astro_algo.calculateSunriseHourAngleDegrees(configValues.latitude, solsticeDeclination);
  const solsticeDaylightMinutes = 8 * solsticeSunriseHourAngleDegrees;

  useEffect(() => {
    const tick = setInterval(() => {
      let currentDate = new Date();
      setCurrentDate(currentDate);
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Natural Time</title>
      </Head>
      <Clock
        className={styles.clock}
        civilTimeMinutes={(currentDate.getHours() * 60) + currentDate.getMinutes()}
        civilTimeOffsetMinutes={timeOffsetMinutes}
        currentDaylightMinutes={daylightMinutes}
        maxDaylightMinutes={solsticeDaylightMinutes}
      />
      <Config className={styles.config}/>
    </div>
  );
}
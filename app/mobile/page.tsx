'use client';

import Config from 'components/config';
import SolarClock from 'components/solar_clock';
import styles from './mobile.module.css';
import Moment from 'types/moment';
import { MomentLabel, MomentMinutes } from  'components/moment';
import * as Constant from 'types/constants';
import { useConfigContext } from 'context/configProvider';
import { useState, useEffect } from 'react';
import astro_algo from '@lea255ace/astro_algo';

const MINUTES_PER_DAY = 1440;
const DEGREES_PER_MINUTE = 360 / MINUTES_PER_DAY;

export default function Home() {
    const initialDate = new Date();
    const {configValues} = useConfigContext();
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

    // TODO(MW): Could this be pushed down into the Clock component to allow this file to be a server component?
    useEffect(() => {
        const tick = setInterval(() => {
            const currentDate = new Date();
            setCurrentDate(currentDate);
        }, 1000);
        return () => clearInterval(tick);
    }, []);

    const civilTimeMinutes = (currentDate.getHours() * 60) + currentDate.getMinutes();
    const civilTimeHourAngleDeg = ((civilTimeMinutes + timeOffsetMinutes) / MINUTES_PER_DAY - 0.5) * 360;
    const sunriseHourAngleDeg = (daylightMinutes / MINUTES_PER_DAY) * -180;
    const solsticeSunriseHourAngleDeg = (solsticeDaylightMinutes / MINUTES_PER_DAY) * -180;
    const civilTimeOffsetAngleDeg = timeOffsetMinutes * DEGREES_PER_MINUTE;

    let trueSolarTime = civilTimeMinutes + timeOffsetMinutes;
    if (trueSolarTime < 0) {
        trueSolarTime += Constant.MINUTES_PER_DAY;
    } else if (trueSolarTime >= Constant.MINUTES_PER_DAY) {
        trueSolarTime -= Constant.MINUTES_PER_DAY;
    }
    const moment = new Moment({ daylightMinutes: daylightMinutes, solarTimeMinutes: trueSolarTime });

    return (
        <div className={styles.container}>
            <div className={styles.clock}>
                <SolarClock
                    civilTimeOffsetAngleDeg={civilTimeOffsetAngleDeg}
                    solsticeSunriseHourAngleDeg={solsticeSunriseHourAngleDeg}
                    sunriseHourAngleDeg={sunriseHourAngleDeg}
                    solarHourAngleDeg={civilTimeHourAngleDeg}
                />
            </div>
            <div>
                <MomentLabel className={styles.moment} momentString={moment.momentName()} />
                <MomentMinutes className={styles.rem} minutesElapsed={Math.floor(moment.currentStageMinutesElapsed())} minutesTotal={Math.floor(moment.currentStageMinutesTotal())} />
            </div>
            <Config className={styles.config} />
        </div>
    );
}
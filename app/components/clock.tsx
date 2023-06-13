import styles from './clock.module.css';
import SolarClock from 'components/solar_clock'

const MINUTES_PER_DAY = 1440;
const DEGREES_PER_MINUTE = 360 / MINUTES_PER_DAY;

export default function Clock({ className, civilTimeMinutes=720, civilTimeOffsetMinutes=0, currentDaylightMinutes=720, maxDaylightMinutes=900 }:
    {
        className?: string
        civilTimeMinutes: number
        civilTimeOffsetMinutes: number
        currentDaylightMinutes: number
        maxDaylightMinutes: number
    }) {
    const civilTimeHourAngleDeg = ((civilTimeMinutes + civilTimeOffsetMinutes) / MINUTES_PER_DAY - 0.5) * 360;
    const sunriseHourAngleDeg = (currentDaylightMinutes / MINUTES_PER_DAY) * -180;
    const solsticeSunriseHourAngleDeg = (maxDaylightMinutes / MINUTES_PER_DAY) * -180;
    const civilTimeOffsetAngleDeg = civilTimeOffsetMinutes * DEGREES_PER_MINUTE;

    return (
        <div className={`${className} ${styles.container}`}>
            <SolarClock civilTimeOffsetAngleDeg={civilTimeOffsetAngleDeg} solsticeSunriseHourAngleDeg={solsticeSunriseHourAngleDeg} sunriseHourAngleDeg={sunriseHourAngleDeg} solarHourAngleDeg={civilTimeHourAngleDeg} />
            <div className={styles.text}>
                <h2>The current civil time is: {String(Math.floor(civilTimeMinutes/60)).padStart(2, '0')}:{String(civilTimeMinutes%60).padStart(2, '0')}</h2>
                <h3>The current civil time offset is {Math.floor(civilTimeOffsetMinutes)} minutes</h3>
                <p>Today has {Math.floor(currentDaylightMinutes/60)}h {String(Math.floor(currentDaylightMinutes%60)).padStart(2, '0')}m of daylight out of {Math.floor(maxDaylightMinutes/60)}h {String(Math.floor(maxDaylightMinutes%60)).padStart(2, '0')}m maximum</p>
            </div>
        </div>
    );
}
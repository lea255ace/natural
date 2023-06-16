import styles from './clock.module.css';
import Moment from 'types/moment';
import { MomentLabel, MomentMinutes } from 'components/moment';
import * as Constant from 'types/constants';
import SolarClock from 'components/solar_clock';

const DEGREES_PER_MINUTE = 360 / Constant.MINUTES_PER_DAY;

export default function Clock({ className, civilTimeMinutes=720, civilTimeOffsetMinutes=0, currentDaylightMinutes=720, maxDaylightMinutes=900 }:
    {
        className?: string
        civilTimeMinutes: number
        civilTimeOffsetMinutes: number
        currentDaylightMinutes: number
        maxDaylightMinutes: number
    }) {
    const civilTimeHourAngleDeg = ((civilTimeMinutes + civilTimeOffsetMinutes) / Constant.MINUTES_PER_DAY - 0.5) * 360;
    const sunriseHourAngleDeg = (currentDaylightMinutes / Constant.MINUTES_PER_DAY) * -180;
    const solsticeSunriseHourAngleDeg = (maxDaylightMinutes / Constant.MINUTES_PER_DAY) * -180;
    const civilTimeOffsetAngleDeg = civilTimeOffsetMinutes * DEGREES_PER_MINUTE;

    let trueSolarTime = civilTimeMinutes + civilTimeOffsetMinutes;
    if (trueSolarTime < 0) {
        trueSolarTime += Constant.MINUTES_PER_DAY;
    } else if (trueSolarTime >= Constant.MINUTES_PER_DAY) {
        trueSolarTime -= Constant.MINUTES_PER_DAY;
    }
    const moment = new Moment({ daylightMinutes: currentDaylightMinutes, solarTimeMinutes: trueSolarTime });

    return (
        <div className={`${className} ${styles.container}`}>
            <SolarClock civilTimeOffsetAngleDeg={civilTimeOffsetAngleDeg} solsticeSunriseHourAngleDeg={solsticeSunriseHourAngleDeg} sunriseHourAngleDeg={sunriseHourAngleDeg} solarHourAngleDeg={civilTimeHourAngleDeg} />
            <div>
                <MomentLabel className={styles.moment} momentString={moment.momentName()} />
                <MomentMinutes className={styles.rem} minutesElapsed={Math.floor(moment.currentStageMinutesElapsed())} minutesTotal={Math.floor(moment.currentStageMinutesTotal())} />
            </div>
            <div className={styles.text}><p>The current civil time is: {String(Math.floor(civilTimeMinutes/60)).padStart(2, '0')}:{String(civilTimeMinutes%60).padStart(2, '0')}</p></div>
        </div>
    );
}
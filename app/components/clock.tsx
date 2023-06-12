import Image from 'next/image';
import styles from './clock.module.css';
import civilClock from '/public/Civil Clock.png';
import solarClock from '/public/Solar Clock.png';
import solsticeLine from '/public/Solstice Line.png';
import sunLine from '/public/Sun Line.png';
import midLine from '/public/Mid Line.png';
import timeHand from '/public/Time Hand.png';
import morning from '/public/Morning.png';
import forenoon from '/public/Forenoon.png';
import afternoon from '/public/Afternoon.png';
import evening from '/public/Evening.png';

const MINUTES_PER_DAY = 1440;

//TODO(MW): Math.floor could be introducing some imprecision, should these use sig figs instead?
export default function Clock({ className, civilTimeMinutes, civilTimeOffsetMinutes, currentDaylightMinutes, maxDaylightMinutes }) {
    const civilTimeAngle = Math.floor(((civilTimeMinutes + civilTimeOffsetMinutes) * 360) / MINUTES_PER_DAY);
    const civilTimeOffsetAngle = Math.floor((civilTimeOffsetMinutes * 360) / MINUTES_PER_DAY);

    const solsticeAngle = Math.floor(((MINUTES_PER_DAY - 2 * maxDaylightMinutes) * 90) / MINUTES_PER_DAY);
    const sunAngle = Math.floor(((MINUTES_PER_DAY - 2 * currentDaylightMinutes) * 90) / MINUTES_PER_DAY);
    const middayAngle = Math.floor(sunAngle / 2) + 45;
    const midnightAngle = Math.floor(sunAngle / 2) - 45;
    const morningAngle = Math.floor((middayAngle + sunAngle) / 2);
    const forenoonAngle = Math.floor(middayAngle / 2) + 45;

    return (
        <div className={`${className} ${styles.container}`}>
            <div className={styles.clock}>
                <Image
                    src={civilClock}
                    className={styles.civil}
                    fill='true'
                    style={{ rotate: civilTimeOffsetAngle + 'deg' }}
                />
                <Image
                    src={solarClock}
                    className={styles.solar}
                    fill='true'
                />
                <Image
                    src={solsticeLine}
                    className={styles.solstice}
                    fill='true'
                    style={{ rotate: (solsticeAngle) + 'deg' }}
                />
                <Image
                    src={solsticeLine}
                    className={styles.solstice}
                    fill='true'
                    style={{ rotate: (-solsticeAngle) + 'deg' }}
                />
                <Image
                    src={solsticeLine}
                    className={styles.solstice}
                    fill='true'
                    style={{ rotate: (180 + solsticeAngle) + 'deg' }}
                />
                <Image
                    src={solsticeLine}
                    className={styles.solstice}
                    fill='true'
                    style={{ rotate: (180 - solsticeAngle) + 'deg' }}
                />
                <Image
                    src={sunLine}
                    className={styles.sun}
                    fill='true'
                    style={{ rotate: (sunAngle) + 'deg' }}
                />
                <Image
                    src={sunLine}
                    className={styles.sun}
                    fill='true'
                    style={{ rotate: (180 - sunAngle) + 'deg' }}
                />
                <Image
                    src={midLine}
                    className={styles.mid}
                    fill='true'
                    style={{ rotate: (middayAngle) + 'deg' }}
                />
                <Image
                    src={midLine}
                    className={styles.mid}
                    fill='true'
                    style={{ rotate: (180 - middayAngle) + 'deg' }}
                />
                <Image
                    src={midLine}
                    className={styles.mid}
                    fill='true'
                    style={{ rotate: (midnightAngle) + 'deg' }}
                />
                <Image
                    src={midLine}
                    className={styles.mid}
                    fill='true'
                    style={{ rotate: (180 - midnightAngle) + 'deg' }}
                />
                <Image
                    src={morning}
                    className={styles.label}
                    fill='true'
                    style={{ rotate: (morningAngle) + 'deg' }}
                />
                <Image
                    src={forenoon}
                    className={styles.label}
                    fill='true'
                    style={{ rotate: (forenoonAngle) + 'deg' }}
                />
                <Image
                    src={afternoon}
                    className={styles.label}
                    fill='true'
                    style={{ rotate: (180 - forenoonAngle) + 'deg' }}
                />
                <Image
                    src={evening}
                    className={styles.label}
                    fill='true'
                    style={{ rotate: (180 - morningAngle) + 'deg' }}
                />
                <Image
                    src={timeHand}
                    className={styles.hand}
                    fill='true'
                    style={{ rotate: civilTimeAngle + 'deg' }}
                />
            </div>
            <div className={styles.text}>
                <h2>The current civil time is: {String(Math.floor(civilTimeMinutes/60)).padStart(2, '0')}:{String(civilTimeMinutes%60).padStart(2, '0')}</h2>
                <h3>The current civil time offset is {Math.floor(civilTimeOffsetMinutes)} minutes</h3>
                <p>Today has {Math.floor(currentDaylightMinutes/60)}h {String(Math.floor(currentDaylightMinutes%60)).padStart(2, '0')}m of daylight out of {Math.floor(maxDaylightMinutes/60)}h {String(Math.floor(maxDaylightMinutes%60)).padStart(2, '0')}m maximum</p>
            </div>
        </div>
    );
}
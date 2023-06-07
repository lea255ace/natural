import Image from 'next/image';
import styles from './clock.module.css';

const MINUTES_PER_DAY = 1440;

//TODO(MW): Math.floor could be introducing some imprecision, should these use sig figs instead?
export default function Clock({ className, civilTimeMinutes, civilTimeOffsetMinutes, currentDaylightMinutes, maxDaylightMinutes }) {
    const civilTimeAngle = Math.floor(((civilTimeMinutes + civilTimeOffsetMinutes) * 360) / MINUTES_PER_DAY);
    const civilTimeOffsetAngle = Math.floor((civilTimeOffsetMinutes * 360) / MINUTES_PER_DAY);

    const solsticeAngle = Math.floor(((MINUTES_PER_DAY - 2 * maxDaylightMinutes) * 90) / MINUTES_PER_DAY);
    const sunAngle = Math.floor(((MINUTES_PER_DAY - 2 * currentDaylightMinutes) * 90) / MINUTES_PER_DAY);
    const middayAngle = Math.floor(sunAngle / 2) + 45;
    const midnightAngle = Math.floor(sunAngle / 2) - 45;

    return (
        <div className={`${className} ${styles.container}`}>
            <div className={styles.clock}>
                <Image
                    src='/static/Civil Clock.png'
                    className={styles.civil}
                    fill='true'
                    style={{ rotate: civilTimeOffsetAngle + 'deg' }}
                />
                <Image
                    src='/static/Solar Clock.png'
                    className={styles.solar}
                    fill='true'
                />
                <Image
                    src='/static/Solstice Line.png'
                    className={styles.solstice}
                    fill='true'
                    style={{ rotate: (solsticeAngle) + 'deg' }}
                />
                <Image
                    src='/static/Solstice Line.png'
                    className={styles.solstice}
                    fill='true'
                    style={{ rotate: (-solsticeAngle) + 'deg' }}
                />
                <Image
                    src='/static/Solstice Line.png'
                    className={styles.solstice}
                    fill='true'
                    style={{ rotate: (180 + solsticeAngle) + 'deg' }}
                />
                <Image
                    src='/static/Solstice Line.png'
                    className={styles.solstice}
                    fill='true'
                    style={{ rotate: (180 - solsticeAngle) + 'deg' }}
                />
                <Image
                    src='/static/Sun Line.png'
                    className={styles.sun}
                    fill='true'
                    style={{ rotate: (sunAngle) + 'deg' }}
                />
                <Image
                    src='/static/Sun Line.png'
                    className={styles.sun}
                    fill='true'
                    style={{ rotate: (180 - sunAngle) + 'deg' }}
                />
                <Image
                    src='/static/Mid Line.png'
                    className={styles.mid}
                    fill='true'
                    style={{ rotate: (middayAngle) + 'deg' }}
                />
                <Image
                    src='/static/Mid Line.png'
                    className={styles.mid}
                    fill='true'
                    style={{ rotate: (180 - middayAngle) + 'deg' }}
                />
                <Image
                    src='/static/Mid Line.png'
                    className={styles.mid}
                    fill='true'
                    style={{ rotate: (midnightAngle) + 'deg' }}
                />
                <Image
                    src='/static/Mid Line.png'
                    className={styles.mid}
                    fill='true'
                    style={{ rotate: (180 - midnightAngle) + 'deg' }}
                />
                <Image
                    src='/static/Time Hand.png'
                    className={styles.hand}
                    fill='true'
                    style={{ rotate: civilTimeAngle + 'deg' }}
                />
            </div>
            <div className={styles.text}>
                <h2>The current civil time is: {Math.floor(civilTimeMinutes/60)}h:{civilTimeMinutes%60}m</h2>
                <h3>The current civil time offset is {Math.floor(civilTimeOffsetMinutes)} minutes</h3>
                <p>Today has {Math.floor(currentDaylightMinutes/60)}h{Math.floor(currentDaylightMinutes%60)}m of daylight out of {Math.floor(maxDaylightMinutes/60)}h{Math.floor(maxDaylightMinutes%60)}m maximum</p>
            </div>
        </div>
    );
}
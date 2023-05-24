import Image from 'next/image';
import styles from './clock.module.css';

const MINUTES_PER_DAY = 1440;

export default function Clock({ civilTimeMinutes, civilTimeOffsetMinutes, currentDaylightMinutes, maxDaylightMinutes }) {
    const civilTimeOffsetAngle = Math.floor((civilTimeOffsetMinutes * 360) / MINUTES_PER_DAY);
    var civilClockStyle = {
        rotate: civilTimeOffsetAngle + 'deg',
    };

    return (
        <div>
            <h1>The current civil time is: {Math.floor(civilTimeMinutes/60)}h:{civilTimeMinutes%60}m</h1>
            <h2>The current civil time offset is {civilTimeOffsetMinutes} minutes</h2>
            <p>Today has {Math.floor(currentDaylightMinutes/60)}h{currentDaylightMinutes%60}m of daylight out of {Math.floor(maxDaylightMinutes/60)}h{maxDaylightMinutes%60}m maximum</p>
            <div className={styles.container}>
                <Image
                    src='/static/Civil Clock.png'
                    className={styles.civil}
                    fill='true'
                    style={civilClockStyle}
                />
                <Image
                    src='/static/Solar Clock.png'
                    className={styles.solar}
                    fill='true'
                />
            </div>
        </div>
    );
}
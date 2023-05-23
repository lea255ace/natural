import Image from 'next/image';

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
            <Image
                src='/static/Civil Clock.png'
                width={600}
                height={600}
                style={civilClockStyle}
            />
        </div>
    );
}
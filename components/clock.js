export default function Clock({ civilTimeMinutes, civilTimeOffsetMinutes, currentDaylightMinutes, maxDaylightMinutes }) {
    return (
        <div>
            <h1>The current civil time is: {Math.floor(civilTimeMinutes/60)}h:{civilTimeMinutes%60}m</h1>
            <h2>The current civil time offset is {civilTimeOffsetMinutes} minutes</h2>
            <p>Today has {Math.floor(currentDaylightMinutes/60)}h{currentDaylightMinutes%60}m of daylight out of {Math.floor(maxDaylightMinutes/60)}h{maxDaylightMinutes%60}m maximum</p>
        </div>
    );
}
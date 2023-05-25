import Clock from '../components/clock';
import { useState } from 'react';

export default function SolarClock() {
    const [currentTimeMinutes, setCurrentTimeMinutes] = useState(739);
    const [civilTimeOffsetMinutes, setCivilTimeOffsetMinutes] = useState(-63.2);
    const [currentDaylightMinutes, setCurrentDaylightMinutes] = useState(872);
    const [maxDaylightMinutes, setMaxDaylightMinutes] = useState(892);

    const changeCurrentTimeMinutes = (e) => {
        setCurrentTimeMinutes(e.target.valueAsNumber);
    }

    const changeCivilTimeOffsetMinutes = (e) => {
        setCivilTimeOffsetMinutes(e.target.valueAsNumber);
    }

    const changeCurrentDaylightMinutes = (e) => {
        setCurrentDaylightMinutes(e.target.valueAsNumber);
    }

    const changeMaxDaylightMinutes = (e) => {
        const minutes = e.target.valueAsNumber;
        setMaxDaylightMinutes(minutes);
        if (currentDaylightMinutes > minutes) {
            setCurrentDaylightMinutes(minutes);
        } else if (currentDaylightMinutes < 1440 - minutes) {
            setCurrentDaylightMinutes(1440 - minutes);
        }
    }

    return (
        <>
            <div>
                <style jsx>{`
                    div {
                        display: flex;
                        flex-direction: column;
                        width: 400px;
                    }
                `}</style>
                <input
                    id="currentTimeMinutes"
                    type="range"
                    onChange={changeCurrentTimeMinutes}
                    min={0}
                    max={1440}
                    step={1}
                    value={currentTimeMinutes}
                />
                <label for="currentTimeMinutes">Current Time</label>
                <br/>
                <input
                    id="civilTimeOffsetMinutes"
                    type="range"
                    onChange={changeCivilTimeOffsetMinutes}
                    min={-100}
                    max={100}
                    step={0.1}
                    value={civilTimeOffsetMinutes}
                />
                <label for="civilTimeOffsetMinutes">Civil Time Offset</label>
                <br/>
                <input
                    id="civilTimeOffsetMinutes"
                    type="range"
                    onChange={changeCurrentDaylightMinutes}
                    min={1440 - maxDaylightMinutes}
                    max={maxDaylightMinutes}
                    step={1}
                    value={currentDaylightMinutes}
                />
                <label for="currentDaylightMinutes">Current Daylight</label>
                <br/>
                <input 
                    id="maxDaylightMinutes"
                    type="range"
                    onChange={changeMaxDaylightMinutes}
                    min={720}
                    max={1440}
                    step={1}
                    value={maxDaylightMinutes}
                />
                <label for="maxDaylightMinutes">Max Daylight</label>
                <br/>
            </div>
            <Clock
                civilTimeMinutes={currentTimeMinutes}
                civilTimeOffsetMinutes={civilTimeOffsetMinutes}
                currentDaylightMinutes={currentDaylightMinutes}
                maxDaylightMinutes={maxDaylightMinutes}
            />
        </>
    );
}
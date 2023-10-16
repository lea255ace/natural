'use client';

import Clock from 'components/clock';
import { AstrolabeProvider } from 'context/astrolabeProvider';
import { useState } from 'react';

export default function SolarClock() {
    //TODO(MW): Push these down into client components
    const [currentDay, setCurrentDay] = useState(0);
    const [currentTimeMinutes, setCurrentTimeMinutes] = useState(0);

    const changeCurrentDay = (e) => {
        const day = e.target.valueAsNumber;
        setCurrentDay(day);
    };

    const changeCurrentTimeMinutes = (e) => {
        const time = e.target.valueAsNumber;
        setCurrentTimeMinutes(time);
    };

    const date = new Date();
    date.setMonth(0, 1);
    date.setDate(date.getDate() + currentDay);
    date.setHours(currentTimeMinutes / 60, currentTimeMinutes % 60);

    return (
        <AstrolabeProvider date={date}>
            <div>
                <style jsx>{`
                    div {
                        display: flex;
                        flex-direction: column;
                        width: 800px;
                    }
                `}</style>
                <input
                    id="currentDay"
                    type="range"
                    onChange={changeCurrentDay}
                    min={0}
                    max={364}
                    step={1}
                    value={currentDay}
                />
                <label htmlFor="currentDay">Current Day</label>
                <br/>
                <input
                    id="currentTimeMinutes"
                    type="range"
                    onChange={changeCurrentTimeMinutes}
                    min={0}
                    max={1440 - 1}
                    step={1}
                    value={currentTimeMinutes}
                />
                <label htmlFor="currentTimeMinutes">Current Time</label>
                <br/>
            </div>
            <Clock />
        </AstrolabeProvider>
    );
}
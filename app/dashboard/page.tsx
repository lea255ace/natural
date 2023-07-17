'use client';

import Config from 'components/config';
import Clock from 'components/clock';
import { useConfigContext } from 'context/configProvider';
import { useState, useEffect } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import astro_algo from '@lea255ace/astro_algo';

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

    return (
        <Grid
            templateColumns='auto 800px 50px 400px auto'
            templateRows='200px 500px'
        >
            <GridItem colStart={2} rowStart={1} rowEnd={3}>
                <Clock
                    civilTimeMinutes={(currentDate.getHours() * 60) + currentDate.getMinutes()}
                    civilTimeOffsetMinutes={timeOffsetMinutes}
                    currentDaylightMinutes={daylightMinutes}
                    maxDaylightMinutes={solsticeDaylightMinutes}
                />
            </GridItem>
            <GridItem colStart={4} rowStart={2}>
                <Config />
            </GridItem>
        </Grid>
    );
}
import Moment from 'types/moment';
import { Text, Highlight } from '@chakra-ui/react';
import * as Constant from 'types/constants';
import SolarClock from 'components/solar_clock';

const DEGREES_PER_MINUTE = 360 / Constant.MINUTES_PER_DAY;

export default function Clock({civilTimeMinutes=720, civilTimeOffsetMinutes=0, currentDaylightMinutes=720, maxDaylightMinutes=900 }:
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
        <>
            <SolarClock civilTimeOffsetAngleDeg={civilTimeOffsetAngleDeg} solsticeSunriseHourAngleDeg={solsticeSunriseHourAngleDeg} sunriseHourAngleDeg={sunriseHourAngleDeg} solarHourAngleDeg={civilTimeHourAngleDeg} />
            <Text align='center' fontSize='2xl' marginTop='-16'><Highlight query={moment.momentName()} styles={{ fontWeight: 'bold' }}>{'The current moment is ' + moment.momentName()}</Highlight></Text>
            <Text align='center' fontSize='xl' marginTop='2'>There are {Math.floor(moment.currentStageMinutesElapsed())} minutes elapsed in the {Math.floor(moment.currentStageMinutesTotal())} minute stage</Text>
            <Text align='center' marginTop='2'>The current civil time is: {String(Math.floor(civilTimeMinutes/60)).padStart(2, '0')}:{String(civilTimeMinutes%60).padStart(2, '0')}</Text>
        </>
    );
}
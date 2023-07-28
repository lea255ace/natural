import { JSX } from 'react';
import Image, { StaticImageData } from 'next/image';
import { Box } from '@chakra-ui/react';

import clockFrame from '/public/Clock Frame.png';
import civilClock from '/public/Civil Clock.png';
import midLines from '/public/Mid Lines.png';
import solsticeLine from '/public/Solstice Line.png';
import sunLine from '/public/Sun Line.png';
import phaseLine from '/public/Phase Line.png';
import stageLine from '/public/Stage Line.png';
import morningLabel from '/public/Morning Label.png';
import forenoonLabel from '/public/Forenoon Label.png';
import afternoonLabel from '/public/Afternoon Label.png';
import eveningLabel from '/public/Evening Label.png';
import firstWatchLabel from '/public/First Watch Label.png';
import secondWatchLabel from '/public/Second Watch Label.png';
import thirdWatchLabel from '/public/Third Watch Label.png';
import fourthWatchLabel from '/public/Fourth Watch Label.png';
import timeHand from '/public/Time Hand.png';
import stageTimer from '/public/Stage Timer.png';
import stageMarker from '/public/Stage Marker.png';
import stageHand from '/public/Stage Hand.png';

type ClockImage = {
    imageSrc: StaticImageData
    zIndex: number
}

type RotatingImageProps = {
    image: ClockImage
    rotationAngleDeg: number
}

const RotatingImage = ({ image: { imageSrc, zIndex}, rotationAngleDeg }: RotatingImageProps): JSX.Element => (
    <Image
        src={imageSrc}
        fill={true}
        alt=''
        style={{ rotate: rotationAngleDeg + 'deg', zIndex: zIndex }}
    />
);

//TODO(MW): There is probably a correct way to automatically keep these Image props consistent with the RotatingImage definition.
const ClockFrame = (): JSX.Element => (
    <Image
        src={clockFrame}
        fill={true}
        alt=''
        style={{ zIndex: 2 }}
    />
);

const midLinesImage: ClockImage = { imageSrc: midLines, zIndex: 1 };
const MidLines = ({ isNight }: { isNight: boolean }): JSX.Element => (
    <RotatingImage image={midLinesImage} rotationAngleDeg={isNight ? 180: 0} />
);

const civilClockImage: ClockImage = { imageSrc: civilClock, zIndex: 4 };
const CivilClock = ({ civilTimeOffsetAngleDeg }:
    { civilTimeOffsetAngleDeg: number }): JSX.Element => (
    <RotatingImage image={civilClockImage} rotationAngleDeg={civilTimeOffsetAngleDeg} />
);

const ClockFaceColors = (): JSX.Element => (
    <svg width='100%' height='100%'>
        <circle cx='50%' cy='50%' r='35%' strokeWidth='0' fill='#ffffff' />
        <circle cx='50%' cy='50%' r='17.5%' strokeWidth='0' fill='#f0f0f0' />
    </svg>
);

const solsticeLineImage: ClockImage = { imageSrc: solsticeLine, zIndex: 1 };
function SolsticeLines({ solsticeSunriseHourAngleDeg }:
    { solsticeSunriseHourAngleDeg: number }): JSX.Element {
    return (
        <>
            <RotatingImage image={solsticeLineImage} rotationAngleDeg={solsticeSunriseHourAngleDeg} />
            <RotatingImage image={solsticeLineImage} rotationAngleDeg={-solsticeSunriseHourAngleDeg} />

            <RotatingImage image={solsticeLineImage} rotationAngleDeg={-solsticeSunriseHourAngleDeg - 180} />
            <RotatingImage image={solsticeLineImage} rotationAngleDeg={solsticeSunriseHourAngleDeg + 180} />
        </>
    );
}

const sunLineImage: ClockImage = { imageSrc: sunLine, zIndex: 2 };
const SunLines = ({ sunriseHourAngleDeg }:
    { sunriseHourAngleDeg: number }): JSX.Element => (
    <>
        <RotatingImage image={sunLineImage} rotationAngleDeg={sunriseHourAngleDeg} />
        <RotatingImage image={sunLineImage} rotationAngleDeg={-sunriseHourAngleDeg} />
    </>
);

const phaseLineImage: ClockImage = { imageSrc: phaseLine, zIndex: 1 };
function PhaseLines({ sunriseHourAngleDeg }:
    { sunriseHourAngleDeg: number }): JSX.Element {
    const dayPhaseHourAngleDeg = sunriseHourAngleDeg * 1 / 2;
    const nightPhaseHourAngleDeg = (sunriseHourAngleDeg - 180) * 1 / 2;
    return (
        <>
            <RotatingImage image={phaseLineImage} rotationAngleDeg={dayPhaseHourAngleDeg} />
            <RotatingImage image={phaseLineImage} rotationAngleDeg={-dayPhaseHourAngleDeg} />

            <RotatingImage image={phaseLineImage} rotationAngleDeg={nightPhaseHourAngleDeg} />
            <RotatingImage image={phaseLineImage} rotationAngleDeg={-nightPhaseHourAngleDeg} />
        </>
    );
}

const stageLineImage: ClockImage = { imageSrc: stageLine, zIndex: 1 };
function StageLines({ sunriseHourAngleDeg }:
    { sunriseHourAngleDeg: number }): JSX.Element {
    const dayInterStageAngleDeg = -sunriseHourAngleDeg / 6;
    const nightInterStageAngleDeg = (180 + sunriseHourAngleDeg) / 6;
    return (
        <>
            <RotatingImage image={stageLineImage} rotationAngleDeg={-dayInterStageAngleDeg * 1} />
            <RotatingImage image={stageLineImage} rotationAngleDeg={-dayInterStageAngleDeg * 2} />
            <RotatingImage image={stageLineImage} rotationAngleDeg={-dayInterStageAngleDeg * 4} />
            <RotatingImage image={stageLineImage} rotationAngleDeg={-dayInterStageAngleDeg * 5} />

            <RotatingImage image={stageLineImage} rotationAngleDeg={dayInterStageAngleDeg * 1} />
            <RotatingImage image={stageLineImage} rotationAngleDeg={dayInterStageAngleDeg * 2} />
            <RotatingImage image={stageLineImage} rotationAngleDeg={dayInterStageAngleDeg * 4} />
            <RotatingImage image={stageLineImage} rotationAngleDeg={dayInterStageAngleDeg * 5} />

            <RotatingImage image={stageLineImage} rotationAngleDeg={-sunriseHourAngleDeg + nightInterStageAngleDeg * 1} />
            <RotatingImage image={stageLineImage} rotationAngleDeg={-sunriseHourAngleDeg + nightInterStageAngleDeg * 2} />
            <RotatingImage image={stageLineImage} rotationAngleDeg={-sunriseHourAngleDeg + nightInterStageAngleDeg * 4} />
            <RotatingImage image={stageLineImage} rotationAngleDeg={-sunriseHourAngleDeg + nightInterStageAngleDeg * 5} />

            <RotatingImage image={stageLineImage} rotationAngleDeg={sunriseHourAngleDeg - nightInterStageAngleDeg * 1} />
            <RotatingImage image={stageLineImage} rotationAngleDeg={sunriseHourAngleDeg - nightInterStageAngleDeg * 2} />
            <RotatingImage image={stageLineImage} rotationAngleDeg={sunriseHourAngleDeg - nightInterStageAngleDeg * 4} />
            <RotatingImage image={stageLineImage} rotationAngleDeg={sunriseHourAngleDeg - nightInterStageAngleDeg * 5} />
        </>
    );
}

const morningLabelImage: ClockImage = { imageSrc: morningLabel, zIndex: 1 };
const forenoonLabelImage: ClockImage = { imageSrc: forenoonLabel, zIndex: 1 };
const afternoonLabelImage: ClockImage = { imageSrc: afternoonLabel, zIndex: 1 };
const eveningLabelImage: ClockImage = { imageSrc: eveningLabel, zIndex: 1 };
function DayLabels({ sunriseHourAngleDeg }:
    { sunriseHourAngleDeg: number }): JSX.Element {
    const morningLabelHourAngleDeg = sunriseHourAngleDeg * 3 / 4;
    const forenoonLabelHourAngleDeg = sunriseHourAngleDeg * 1 / 4;
    return (
        <>
            <RotatingImage image={morningLabelImage} rotationAngleDeg={morningLabelHourAngleDeg} />
            <RotatingImage image={forenoonLabelImage} rotationAngleDeg={forenoonLabelHourAngleDeg} />
            <RotatingImage image={afternoonLabelImage} rotationAngleDeg={-forenoonLabelHourAngleDeg} />
            <RotatingImage image={eveningLabelImage} rotationAngleDeg={-morningLabelHourAngleDeg} />
        </>
    );
}

const firstWatchLabelImage: ClockImage = { imageSrc: firstWatchLabel, zIndex: 1 };
const secondWatchLabelImage: ClockImage = { imageSrc: secondWatchLabel, zIndex: 1 };
const thirdWatchLabelImage: ClockImage = { imageSrc: thirdWatchLabel, zIndex: 1 };
const fourthWatchLabelImage: ClockImage = { imageSrc: fourthWatchLabel, zIndex: 1 };
function NightLabels({ sunriseHourAngleDeg }:
    { sunriseHourAngleDeg: number }): JSX.Element {
    const firstWatchLabelHourAngleDeg = -sunriseHourAngleDeg * 3 / 4 + 45;
    const secondWatchLabelHourAngleDeg = -sunriseHourAngleDeg * 1 / 4 + 135;

    return (
        <>
            <RotatingImage image={firstWatchLabelImage} rotationAngleDeg={firstWatchLabelHourAngleDeg} />
            <RotatingImage image={secondWatchLabelImage} rotationAngleDeg={secondWatchLabelHourAngleDeg} />
            <RotatingImage image={thirdWatchLabelImage} rotationAngleDeg={-secondWatchLabelHourAngleDeg} />
            <RotatingImage image={fourthWatchLabelImage} rotationAngleDeg={-firstWatchLabelHourAngleDeg} />
        </>
    );
}

const timeHandImage: ClockImage = { imageSrc: timeHand, zIndex: 5 };
const TimeHand = ({ solarHourAngleDeg }:
    { solarHourAngleDeg: number }): JSX.Element => (
    <RotatingImage image={timeHandImage} rotationAngleDeg={solarHourAngleDeg} />
);

const StageTimer = (): JSX.Element => (
    <Image
        src={stageTimer}
        fill={true}
        alt=''
        style={{ zIndex: 3 }}
    />
);

const stageMarkerImage: ClockImage = { imageSrc: stageMarker, zIndex: 4 };
const StageMarker = ({ stageMarkerAngleDeg }: { stageMarkerAngleDeg: number }): JSX.Element => (
    <RotatingImage image={stageMarkerImage} rotationAngleDeg={stageMarkerAngleDeg} />
);

const stageHandImage: ClockImage = { imageSrc: stageHand, zIndex: 5 };
const StageHand = ({ stageHandAngleDeg }: { stageHandAngleDeg: number }): JSX.Element => (
    <RotatingImage image={stageHandImage} rotationAngleDeg={stageHandAngleDeg} />
);

function StageHighlight({ stageHandAngleDeg }: { stageHandAngleDeg: number }): JSX.Element {
    const xPos = 65 + 55 * Math.sin(stageHandAngleDeg * Math.PI / 180);
    const yPos = 65 - 55 * Math.cos(stageHandAngleDeg * Math.PI / 180);
    const pathStr = 'M 65 65 L 65 10 A 55 55 0 ' + (stageHandAngleDeg >= 0 && stageHandAngleDeg < 180 ? '1' : '0') + ' 0 ' + xPos + ' ' + yPos;
    return (
        <svg width='100%' height='100%'>
            <svg viewBox='0 0 130 130'>
                <circle cx='65' cy='65' r='55' fill={stageHandAngleDeg >=0 ? '#f8f8f8' : '#ccccff'} />
                <path d={pathStr} fill={stageHandAngleDeg >= 0 ? '#ccccff' : '#ff9999'}/>
            </svg>
        </svg>
    );
}

export default function SolarClock({ civilTimeOffsetAngleDeg = 0, solsticeSunriseHourAngleDeg = -120, sunriseHourAngleDeg = -90, solarHourAngleDeg = 0, stageHandAngleDeg = 0 }: {
    civilTimeOffsetAngleDeg: number
    solsticeSunriseHourAngleDeg: number
    sunriseHourAngleDeg: number
    solarHourAngleDeg: number
    stageHandAngleDeg: number
}) {

    const isNight: boolean = solarHourAngleDeg < sunriseHourAngleDeg || solarHourAngleDeg >= -sunriseHourAngleDeg;
    return (
        <Box position='relative' aspectRatio='1/1' overflow='hidden'>
            <ClockFrame />
            <MidLines isNight={isNight} />
            <CivilClock civilTimeOffsetAngleDeg={civilTimeOffsetAngleDeg} />
            <Box position='absolute' width='100%' height='100%'>
                <ClockFaceColors />
            </Box>

            <SolsticeLines solsticeSunriseHourAngleDeg={solsticeSunriseHourAngleDeg} />
            <SunLines sunriseHourAngleDeg={sunriseHourAngleDeg} />
            <PhaseLines sunriseHourAngleDeg={sunriseHourAngleDeg} />
            <StageLines sunriseHourAngleDeg={sunriseHourAngleDeg} />
            <DayLabels sunriseHourAngleDeg={sunriseHourAngleDeg} />
            <NightLabels sunriseHourAngleDeg={sunriseHourAngleDeg} />

            <TimeHand solarHourAngleDeg={solarHourAngleDeg} />

            <Box position='relative' width='8%' height='8%' mx='auto' marginTop={isNight ? '21%' : '71.75%'}>
                <StageTimer />
                <StageMarker stageMarkerAngleDeg={(isNight ? -1 : 1) * (1 + sunriseHourAngleDeg / 90) * 360} />
                <StageHand stageHandAngleDeg={stageHandAngleDeg} />
                <StageHighlight stageHandAngleDeg={stageHandAngleDeg} />
            </Box>
        </Box>
    );
}
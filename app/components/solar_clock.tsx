import { JSX } from 'react';
import Image, { StaticImageData } from 'next/image';
import styles from './solar_clock.module.css';

import clockFrame from '/public/Solar Clock.png';
import civilClock from '/public/Civil Clock.png';
import solsticeLine from '/public/Solstice Line.png';
import sunLine from '/public/Sun Line.png';
import phaseLine from '/public/Mid Line.png';
import morningLabel from '/public/Morning.png';
import forenoonLabel from '/public/Forenoon.png';
import afternoonLabel from '/public/Afternoon.png';
import eveningLabel from '/public/Evening.png';
import timeHand from '/public/Time Hand.png';

type ClockImage = {
    imageSrc: StaticImageData
    className: string
}

type RotatingImageProps = {
    image: ClockImage
    rotationAngleDeg: number
}

const RotatingImage = ({ image: { imageSrc, className }, rotationAngleDeg }: RotatingImageProps): JSX.Element => (
    <Image
        src={imageSrc}
        className={className}
        fill={true}
        alt=""
        style={{ rotate: rotationAngleDeg + 'deg' }}
    />
);

//TODO(MW): There is probably a correct way to automatically keep these Image props consistent with the RotatingImage definition.
const ClockFrame = (): JSX.Element => (
    <Image
        src={clockFrame}
        className={styles.frame}
        fill={true}
        alt=""
    />
);

const civilClockImage: ClockImage = { imageSrc: civilClock, className: styles.civil };
const CivilClock = ({ civilTimeOffsetAngleDeg }:
    { civilTimeOffsetAngleDeg: number }): JSX.Element => (
    <RotatingImage image={civilClockImage} rotationAngleDeg={civilTimeOffsetAngleDeg} />
);

//TODO(MW): Adjust image orientations so hour angle can be used directly, removing the +90 offset (+180 for time hand).
const solsticeLineImage: ClockImage = { imageSrc: solsticeLine, className: styles.solstice };
function SolsticeLines({ solsticeSunriseHourAngleDeg }:
    { solsticeSunriseHourAngleDeg: number }): JSX.Element {
    return (
        <>
            <RotatingImage image={solsticeLineImage} rotationAngleDeg={solsticeSunriseHourAngleDeg + 90} />
            <RotatingImage image={solsticeLineImage} rotationAngleDeg={-solsticeSunriseHourAngleDeg + 90} />

            <RotatingImage image={solsticeLineImage} rotationAngleDeg={-solsticeSunriseHourAngleDeg - 180 + 90} />
            <RotatingImage image={solsticeLineImage} rotationAngleDeg={solsticeSunriseHourAngleDeg + 180 + 90} />
        </>
    );
}

const sunLineImage: ClockImage = { imageSrc: sunLine, className: styles.sun };
const SunLines = ({ sunriseHourAngleDeg }:
    { sunriseHourAngleDeg: number }): JSX.Element => (
    <>
        <RotatingImage image={sunLineImage} rotationAngleDeg={sunriseHourAngleDeg + 90} />
        <RotatingImage image={sunLineImage} rotationAngleDeg={-sunriseHourAngleDeg + 90} />
    </>
);

const phaseLineImage: ClockImage = { imageSrc: phaseLine, className: styles.phase };
function PhaseLines({ sunriseHourAngleDeg }:
    { sunriseHourAngleDeg: number }): JSX.Element {
    const dayPhaseHourAngleDeg = sunriseHourAngleDeg * 1 / 2;
    const nightPhaseHourAngleDeg = (sunriseHourAngleDeg - 180) * 1 / 2;
    return (
        <>
            <RotatingImage image={phaseLineImage} rotationAngleDeg={dayPhaseHourAngleDeg + 90} />
            <RotatingImage image={phaseLineImage} rotationAngleDeg={-dayPhaseHourAngleDeg + 90} />

            <RotatingImage image={phaseLineImage} rotationAngleDeg={nightPhaseHourAngleDeg + 90} />
            <RotatingImage image={phaseLineImage} rotationAngleDeg={-nightPhaseHourAngleDeg + 90} />
        </>
    );
}

const morningLabelImage: ClockImage = { imageSrc: morningLabel, className: styles.label };
const forenoonLabelImage: ClockImage = { imageSrc: forenoonLabel, className: styles.label };
const afternoonLabelImage: ClockImage = { imageSrc: afternoonLabel, className: styles.label };
const eveningLabelImage: ClockImage = { imageSrc: eveningLabel, className: styles.label };
function DayLabels({ sunriseHourAngleDeg }:
    { sunriseHourAngleDeg: number }): JSX.Element {
    const morningLabelHourAngleDeg = sunriseHourAngleDeg * 3 / 4;
    const forenoonLabelHourAngleDeg = sunriseHourAngleDeg * 1 / 4;
    return (
        <>
            <RotatingImage image={morningLabelImage} rotationAngleDeg={morningLabelHourAngleDeg + 90} />
            <RotatingImage image={forenoonLabelImage} rotationAngleDeg={forenoonLabelHourAngleDeg + 90} />
            <RotatingImage image={afternoonLabelImage} rotationAngleDeg={-forenoonLabelHourAngleDeg + 90} />
            <RotatingImage image={eveningLabelImage} rotationAngleDeg={-morningLabelHourAngleDeg + 90} />
        </>
    );
}

const timeHandImage: ClockImage = { imageSrc: timeHand, className: styles.hand };
const TimeHand = ({ solarHourAngleDeg }:
    { solarHourAngleDeg: number }): JSX.Element => (
    <RotatingImage image={timeHandImage} rotationAngleDeg={solarHourAngleDeg + 180} />
);

export default function SolarClock({civilTimeOffsetAngleDeg = 0, solsticeSunriseHourAngleDeg = -120, sunriseHourAngleDeg = -90, solarHourAngleDeg = 0}: {
        civilTimeOffsetAngleDeg: number
        solsticeSunriseHourAngleDeg: number
        sunriseHourAngleDeg: number
        solarHourAngleDeg: number
    }) {

    return (
        <div className={styles.solarClock}>
            <ClockFrame />

            <CivilClock civilTimeOffsetAngleDeg={civilTimeOffsetAngleDeg} />

            <SolsticeLines solsticeSunriseHourAngleDeg={solsticeSunriseHourAngleDeg} />
            <SunLines sunriseHourAngleDeg={sunriseHourAngleDeg} />
            <PhaseLines sunriseHourAngleDeg={sunriseHourAngleDeg} />
            <DayLabels sunriseHourAngleDeg={sunriseHourAngleDeg} />

            <TimeHand solarHourAngleDeg={solarHourAngleDeg} />
        </div>
    );
}
import { JSX } from 'react';
import Image, { StaticImageData } from 'next/image';
import styles from './solar_clock.module.css';

import clockFrame from '/public/Clock Frame.png';
import civilClock from '/public/Civil Clock.png';
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
        alt=''
        style={{ rotate: rotationAngleDeg + 'deg' }}
    />
);

//TODO(MW): There is probably a correct way to automatically keep these Image props consistent with the RotatingImage definition.
const ClockFrame = (): JSX.Element => (
    <Image
        src={clockFrame}
        className={styles.frame}
        fill={true}
        alt=''
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
            <RotatingImage image={solsticeLineImage} rotationAngleDeg={solsticeSunriseHourAngleDeg} />
            <RotatingImage image={solsticeLineImage} rotationAngleDeg={-solsticeSunriseHourAngleDeg} />

            <RotatingImage image={solsticeLineImage} rotationAngleDeg={-solsticeSunriseHourAngleDeg - 180} />
            <RotatingImage image={solsticeLineImage} rotationAngleDeg={solsticeSunriseHourAngleDeg + 180} />
        </>
    );
}

const sunLineImage: ClockImage = { imageSrc: sunLine, className: styles.sun };
const SunLines = ({ sunriseHourAngleDeg }:
    { sunriseHourAngleDeg: number }): JSX.Element => (
    <>
        <RotatingImage image={sunLineImage} rotationAngleDeg={sunriseHourAngleDeg} />
        <RotatingImage image={sunLineImage} rotationAngleDeg={-sunriseHourAngleDeg} />
    </>
);

const phaseLineImage: ClockImage = { imageSrc: phaseLine, className: styles.phase };
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

const stageLineImage: ClockImage = { imageSrc: stageLine, className: styles.stage };
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
            <RotatingImage image={morningLabelImage} rotationAngleDeg={morningLabelHourAngleDeg} />
            <RotatingImage image={forenoonLabelImage} rotationAngleDeg={forenoonLabelHourAngleDeg} />
            <RotatingImage image={afternoonLabelImage} rotationAngleDeg={-forenoonLabelHourAngleDeg} />
            <RotatingImage image={eveningLabelImage} rotationAngleDeg={-morningLabelHourAngleDeg} />
        </>
    );
}

const firstWatchLabelImage: ClockImage = { imageSrc: firstWatchLabel, className: styles.label };
const secondWatchLabelImage: ClockImage = { imageSrc: secondWatchLabel, className: styles.label };
const thirdWatchLabelImage: ClockImage = { imageSrc: thirdWatchLabel, className: styles.label };
const fourthWatchLabelImage: ClockImage = { imageSrc: fourthWatchLabel, className: styles.label };
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

const timeHandImage: ClockImage = { imageSrc: timeHand, className: styles.hand };
const TimeHand = ({ solarHourAngleDeg }:
    { solarHourAngleDeg: number }): JSX.Element => (
    <RotatingImage image={timeHandImage} rotationAngleDeg={solarHourAngleDeg} />
);

export default function SolarClock({ civilTimeOffsetAngleDeg = 0, solsticeSunriseHourAngleDeg = -120, sunriseHourAngleDeg = -90, solarHourAngleDeg = 0 }: {
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
            <StageLines sunriseHourAngleDeg={sunriseHourAngleDeg} />
            <DayLabels sunriseHourAngleDeg={sunriseHourAngleDeg} />
            <NightLabels sunriseHourAngleDeg={sunriseHourAngleDeg} />

            <TimeHand solarHourAngleDeg={solarHourAngleDeg} />
        </div>
    );
}
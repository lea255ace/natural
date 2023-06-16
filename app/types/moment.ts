import * as Constant from 'types/constants';

export enum Phase {
    Morning = 0,
    Forenoon,
    Afternoon,
    Evening,
    FirstWatch,
    SecondWatch,
    ThirdWatch,
    FourthWatch
}

const PhaseNames: { [key in Phase] : string } = {
    [Phase.Morning]: 'Morning',
    [Phase.Forenoon]: 'Forenoon',
    [Phase.Afternoon]: 'Afternoon',
    [Phase.Evening]: 'Evening',
    [Phase.FirstWatch]: 'First Watch',
    [Phase.SecondWatch]: 'Second Watch',
    [Phase.ThirdWatch]: 'Third Watch',
    [Phase.FourthWatch]: 'Fourth Watch'
};

export enum Stage {
    Early = 0,
    Mid,
    Late
}

const StageNames: { [key in Stage] : string } = {
    [Stage.Early]: 'Early',
    [Stage.Mid]: 'Mid',
    [Stage.Late]: 'Late'
};

export default class Moment {
    #phaseMinutes: number;
    #phase: Phase;
    #stage: Stage;
    #stageMinutesElapsed: number;

    constructor({ daylightMinutes, solarTimeMinutes }:
        { daylightMinutes: number, solarTimeMinutes: number } ) {

        const nightMinutes = Constant.MINUTES_PER_DAY - daylightMinutes;
        const sunriseMinutes = nightMinutes / 2;
        const sunsetMinutes = sunriseMinutes + daylightMinutes;
        let phaseRemainder;
        if (solarTimeMinutes < sunriseMinutes) {
            this.#phaseMinutes = nightMinutes / 4;
            this.#phase = Math.floor(solarTimeMinutes / this.#phaseMinutes) + 6;
            phaseRemainder = solarTimeMinutes % this.#phaseMinutes;
        } else if (solarTimeMinutes < sunsetMinutes) {
            this.#phaseMinutes = daylightMinutes / 4;
            this.#phase = Math.floor((solarTimeMinutes - sunriseMinutes) / this.#phaseMinutes);
            phaseRemainder = (solarTimeMinutes - sunriseMinutes) % this.#phaseMinutes;
        } else {
            this.#phaseMinutes = nightMinutes / 4;
            this.#phase = Math.floor((solarTimeMinutes - sunsetMinutes) / this.#phaseMinutes) + 4;
            phaseRemainder = (solarTimeMinutes - sunsetMinutes) % this.#phaseMinutes;
        }
        const stageMinutes = this.#phaseMinutes / 3;
        this.#stage = Math.floor(phaseRemainder / stageMinutes);
        this.#stageMinutesElapsed = phaseRemainder % stageMinutes;
    }

    momentName():string {
        return StageNames[this.#stage] + ' ' + PhaseNames[this.#phase];
    }

    currentStageMinutesTotal():number {
        return this.#phaseMinutes / 3;
    }

    currentStageMinutesElapsed():number {
        return this.#stageMinutesElapsed;
    }
}
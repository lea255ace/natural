import astro_algo from '@lea255ace/astro_algo';

export default class Astrolabe {
    #date: Date;
    #latitude: number;
    #longitude: number;

    declination: number;
    eqTime: number;

    constructor({ date, latitude, longitude }: { date: Date, latitude: number, longitude: number }) {
        this.#date = date;
        this.#latitude = latitude;
        this.#longitude = longitude;
    }

    civilTimeMinutes() {
        return this.#date.getHours() * 60 + this.#date.getMinutes();
    }
    civilTimeOffsetMinutes() {
        const eqTime = astro_algo.calculateEqTimeMinutes(this.#date);
        //NB: Date.getTimezoneOffset returns an offset in minutes, with the opposite sign as the timezone.
        return eqTime + 4 * this.#longitude + this.#date.getTimezoneOffset();
    }

    #calculateDaylightMinutes(date: Date) {
        const declination = astro_algo.calculateDeclinationRadians(date);
        const sunriseHourAngleDegrees = astro_algo.calculateSunriseHourAngleDegrees(this.#latitude, declination);
        return 8 * sunriseHourAngleDegrees;
    }

    daylightMinutes(): number {
        return this.#calculateDaylightMinutes(this.#date);
    }

    solsticeDaylightMinutes(): number {
        const summerSolsticeDate = astro_algo.calculateQuarterDayForYear(astro_algo.QuarterDays.SummerSolstice, this.#date.getFullYear());
        return this.#calculateDaylightMinutes(summerSolsticeDate);
    }
}
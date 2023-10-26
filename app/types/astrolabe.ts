import astro_algo from '@lea255ace/astro_algo';

export default class Astrolabe {
    date: Date;
    #latitude: number;
    #longitude: number;

    constructor({ date, latitude, longitude }: { date: Date, latitude: number, longitude: number }) {
        this.date = date;
        this.#latitude = latitude;
        this.#longitude = longitude;
    }

    dayOfYear(date = this.date) {
        const startDate = new Date(date.getFullYear(), 0, 1);
        const dateDiff = (date.getTime() - startDate.getTime()) + ((startDate.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
        const dayLength = 1000 * 60 * 60 * 24;
        return Math.floor(dateDiff / dayLength);
    }

    #probeForDay({startDate, day, count}: {startDate: Date, day: number, count: number}) {
        const checkDate = new Date(startDate);
        let dayCount = (checkDate.getDay() == day) ? 1 : 0;
        while (dayCount < count) {
            checkDate.setDate(checkDate.getDate() + 1);
            if (checkDate.getDay() == day) {
                ++dayCount;
            }
        }
        return checkDate;
    }

    // US DST Start: Second Sunday in March
    daylightSavingsStartDate(date = this.date) {
        const startDate = this.#probeForDay({startDate: new Date(date.getFullYear(), 2, 1), day: 0, count: 2});
        startDate.setHours(2, 0, 0, 0);
        return startDate;
    }

    // US DST End: First Sunday in November
    daylightSavingsEndDate(date = this.date) {
        const endDate = this.#probeForDay({startDate: new Date(date.getFullYear(), 10, 1), day: 0, count: 1});
        endDate.setHours(2, 0, 0, 0);
        return endDate;
    }

    isDaylightSavings(date = this.date) {
        const winterDateOffset = new Date(date.getFullYear(), 0, 1).getTimezoneOffset();
        const summerDateOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
        return date.getTimezoneOffset() !== Math.max(winterDateOffset, summerDateOffset);
    }

    eqTime(date = this.date) {
        return astro_algo.calculateEqTimeMinutes(date);
    }

    civilTimeMinutes(date = this.date) {
        return date.getHours() * 60 + date.getMinutes();
    }

    civilTimeOffsetMinutes(date = this.date) {
        const eqTime = astro_algo.calculateEqTimeMinutes(date);
        //NB: Date.getTimezoneOffset returns an offset in minutes, with the opposite sign as the timezone.
        return eqTime + 4 * this.#longitude + date.getTimezoneOffset();
    }

    daylightMinutes(date = this.date): number {
        const declination = astro_algo.calculateDeclinationRadians(date);
        const sunriseHourAngleDegrees = astro_algo.calculateSunriseHourAngleDegrees(this.#latitude, declination);
        return 8 * sunriseHourAngleDegrees;
    }

    solsticeDaylightMinutes(date = this.date): number {
        const summerSolsticeDate = astro_algo.calculateQuarterDayForYear(astro_algo.QuarterDays.SummerSolstice, date.getFullYear());
        return this.daylightMinutes(summerSolsticeDate);
    }
}
export function MomentLabel({ className, momentString }: {
    className?: string,
    momentString: string
    }) {
    return <p className={className}>The current moment is <em>{momentString}</em></p>;
}

export function MomentMinutes({ className, minutesElapsed, minutesTotal }: {
    className?: string,
    minutesElapsed: number,
    minutesTotal: number
    }) {
    return <p className={className}>There are {minutesElapsed} minutes elapsed in the {minutesTotal} minute stage</p>;
}
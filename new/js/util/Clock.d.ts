export declare class Clock {
    private lastTime;
    private startTime;
    private elapsedTimeBeforePause;
    start(): void;
    continue(): void;
    pause(): void;
    getDT(): number;
}

export declare class System {
    static instance: System;
    private clock;
    private isPlaying;
    constructor();
    private innerLoop;
    loop(dt: number): void;
    start: () => boolean;
    stop: () => boolean;
}

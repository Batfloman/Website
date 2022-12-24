export declare class System {
    private static instance;
    private isPlaying;
    constructor();
    private innerLoop;
    loop(): void;
    start: () => boolean;
    stop: () => boolean;
    static getSystem(): System;
}

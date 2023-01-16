import { Clock } from "./../util/Clock.js";
export class LoopingSystem {
    static instance;
    clock = new Clock();
    isRunning = false;
    constructor() {
        LoopingSystem.instance = this;
        this.innerLoop();
    }
    // handles loop relevant stuff
    innerLoop() {
        if (this.isRunning)
            this.loop(this.clock.getDt());
        requestAnimationFrame(() => this.innerLoop());
    }
    start = () => (this.isRunning = true);
    stop = () => (this.isRunning = false);
    get = {
        clock: () => this.clock,
        runningStatus: () => this.isRunning,
    };
}

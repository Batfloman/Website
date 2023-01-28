import { Clock } from "./../util/Clock.js";
export class LoopingSystem {
    static instance;
    clock = new Clock();
    isRunning = false;
    constructor() {
        LoopingSystem.instance = this;
        this.innerLoop();
        window.addEventListener("blur", this.stop.bind(this));
        window.addEventListener("focus", this.start.bind(this));
    }
    // handles loop relevant stuff
    innerLoop() {
        const dt = this.clock.getDt();
        if (this.isRunning)
            this.loop(dt);
        requestAnimationFrame(() => this.innerLoop());
    }
    start = () => (this.isRunning = true);
    stop = () => (this.isRunning = false);
    get = {
        clock: () => this.clock,
        runningStatus: () => this.isRunning,
    };
}

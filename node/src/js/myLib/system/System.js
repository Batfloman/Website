import { Clock } from "three";
export class System {
    static instance;
    clock = new Clock();
    isPlaying = false;
    constructor() {
        System.instance = this;
        this.innerLoop();
    }
    // handles loop relevant stuff
    innerLoop() {
        if (this.isPlaying)
            this.loop(this.clock.getDelta());
        requestAnimationFrame(() => {
            this.innerLoop();
        });
    }
    // can be changed for situation
    loop(dt) {
        console.warn(`loop has nothing to do`);
    }
    start = () => (this.isPlaying = true);
    stop = () => (this.isPlaying = false);
}

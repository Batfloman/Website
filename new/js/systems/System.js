export class System {
    static instance;
    isPlaying = false;
    constructor() {
        System.instance = this;
        this.innerLoop();
    }
    // handles loop relevant stuff
    innerLoop() {
        if (this.isPlaying)
            this.loop();
        requestAnimationFrame(() => {
            this.innerLoop();
        });
    }
    // can be changed for situation
    loop() {
        console.warn(`loop has nothing to do`);
    }
    start = () => (this.isPlaying = true);
    stop = () => (this.isPlaying = false);
    static getSystem() {
        return System.instance;
    }
}

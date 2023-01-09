export class Clock {
    lastTime;
    startTime;
    elapsedTimeBeforePause;
    start() {
        this.startTime = Date.now();
        this.lastTime = Date.now();
    }
    continue() {
        this.startTime = Date.now() - (this.elapsedTimeBeforePause || 0);
    }
    pause() {
        this.elapsedTimeBeforePause = this.getDT();
    }
    getDT() {
        const now = Date.now();
        const dt = now - (this.lastTime || now);
        this.lastTime = now;
        return dt;
    }
}

export class Clock {
    lastTime;
    startTime;
    elapsedTimeBeforePause;
    start() {
        this.startTime = this.lastTime = Date.now();
    }
    continue() {
        this.startTime = Date.now() - (this.elapsedTimeBeforePause || 0);
    }
    pause() {
        this.elapsedTimeBeforePause = this.getDt();
    }
    getDt() {
        const now = Date.now();
        const dt = now - (this.lastTime || now);
        this.lastTime = now;
        return dt;
    }
}

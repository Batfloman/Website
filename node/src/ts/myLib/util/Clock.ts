export class Clock {
  private lastTime!: number;
  private startTime!: number;
  private elapsedTimeBeforePause!: number;

  public start(): void {
    this.startTime = this.lastTime = Date.now();
  }
  public continue() {
    this.startTime = Date.now() - (this.elapsedTimeBeforePause || 0);
  }
  public pause() {
    this.elapsedTimeBeforePause = this.getDt();
  }

  public getDt(): number {
    const now = Date.now();
    const dt = now - (this.lastTime || now);
    this.lastTime = now;
    return dt;
  }
}

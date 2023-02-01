import { Clock } from "./../util/Clock.js";

export abstract class LoopingSystem {
  static instance: LoopingSystem;

  protected clock: Clock = new Clock();
  protected isRunning: boolean = false;

  public constructor() {
    LoopingSystem.instance = this;
    this.innerLoop();

    window.addEventListener("blur", this.stop);
    window.addEventListener("focus", this.start);
  }

  // handles loop relevant stuff
  private innerLoop() {
    const dt = this.clock.getDt();
    if (this.isRunning) this.loop(dt);

    requestAnimationFrame(() => this.innerLoop());
  }

  public abstract loop(dt: number): void;

  // public start = () => (this.isRunning = true);
  public start = (): void => {
    this.clock.start();
    this.isRunning = true;
  };
  public stop = () => (this.isRunning = false);

  public get = {
    clock: (): Clock => this.clock,
    runningStatus: (): boolean => this.isRunning,
  };
}

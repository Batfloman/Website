import { Clock } from "./../util/Clock.js";

export abstract class LoopingSystem {
  static instance: LoopingSystem;

  protected clock: Clock = new Clock();
  protected isRunning: boolean = false;

  public constructor() {
    LoopingSystem.instance = this;
    this.innerLoop();
  }

  // handles loop relevant stuff
  private innerLoop() {
    if (this.isRunning) this.loop(this.clock.getDt());

    requestAnimationFrame(() => this.innerLoop());
  }

  public abstract loop(dt: number): void;

  public start = () => (this.isRunning = true);
  public stop = () => (this.isRunning = false);

  public get = {
    clock: (): Clock => this.clock,
    runningStatus: (): boolean => this.isRunning,
  };
}

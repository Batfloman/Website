import { Clock } from "three";

export class System {
  static instance: System;

  private clock: Clock = new Clock();
  private isPlaying: boolean = false;

  public constructor() {
    System.instance = this;
    this.innerLoop();
  }

  // handles loop relevant stuff
  private innerLoop() {
    if (this.isPlaying) this.loop(this.clock.getDelta());

    requestAnimationFrame(() => {
      this.innerLoop();
    });
  }

  // can be changed for situation
  loop(dt: number) {
    console.warn(`loop has nothing to do`);
  }

  public start = () => (this.isPlaying = true);
  public stop = () => (this.isPlaying = false);
}

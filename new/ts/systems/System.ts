import { Renderer } from "../display/Renderer.js";

export class System {
  private static instance: System;

  private isPlaying: boolean = false;

  public constructor() {
    System.instance = this;
    this.innerLoop();
  }

  // handles loop relevant stuff
  private innerLoop() {
    if (this.isPlaying) this.loop();

    requestAnimationFrame(() => {
      this.innerLoop();
    });
  }

  // can be changed for situation
  loop() {
    console.warn(`loop has nothing to do`);
  }

  public start = () => (this.isPlaying = true);
  public stop = () => (this.isPlaying = false);

  public static getSystem(): System {
    return System.instance;
  }
}

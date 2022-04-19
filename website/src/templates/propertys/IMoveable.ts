import { ICollideable } from "./ICollideable.js";

export interface IMoveable extends ICollideable {
  lockMovement: boolean;

  move(direction: number, distance: number): void;
}
import IPositionable from "./IPositionable";

export default interface IMoveable extends IPositionable {
  move(direction: number, distance: number): void;
}
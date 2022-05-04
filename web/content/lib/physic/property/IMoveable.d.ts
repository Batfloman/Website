import IPositionable from "./IPositionable.js";
export default interface IMoveable extends IPositionable {
    move(direction: number, distance: number): void;
}

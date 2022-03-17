import Formeln from "../Formeln.js";
import Input from "../input/Input.js";
import WorldObject from "./WorldObject.js";

export default class MoveableObject extends WorldObject {
  
  /** @type {boolean} - locks movement */
  bLockMovement;

  /** @type {Map} - key */
  controles = new Map();
  
  constructor(centerPos, hitBox, controles) {
    super(centerPos, hitBox);

    if(!controles) {
      this.controles = new Map();
      this.controles.set("w", (dt) => {this.move(0, 100*dt/1000)});
      this.controles.set("s", (dt) => {this.move(180, 100*dt/1000)});
      this.controles.set("a", (dt) => {this.move(-90, 100*dt/1000)});
      this.controles.set("d", (dt) => {this.move(90, 100*dt/1000)});
      this.controles.set("q", (dt) => {this.rotate(-90*dt/1000)});
      this.controles.set("e", (dt) => {this.rotate(90*dt/1000)});
    }
  }

  update(dt) {
    if(this.bLockMovement) return;
    
    Input.getPressedKeys().forEach(key => {
      if(this.controles.has(key)) {
        this.controles.get(key)(dt)
      }
    }) 
  }

  move(direction, distance) {
    this.centerPos = Formeln.moveDirection(this.centerPos, direction, distance);
  }
}

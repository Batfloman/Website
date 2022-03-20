import Formeln from "../Formeln.js";
import Input from "../input/Input.js";
import WorldObject from "./WorldObject.js";

export default class MoveableObject extends WorldObject {
  
  /** @type {boolean} - locks movement */
  lockMovement = true;

  /** @type {Map} - key */
  controles = new Map();
  
  constructor(centerPos, hitBox, controles) {
    super(centerPos, hitBox);
    
    if(!controles) throw new Error("no controles set!");

    this.controles = controles;
  }

  update(dt) {
    if(this.lockMovement) return;

    Input.getPressedKeys().forEach(key => {
      if(!(this.getPressedKeys) && this.controles.has(key)) {
        this.controles.get(key)(dt)
      }
    }) 
  }

  move(direction, distance) {
    this.centerPos = Formeln.moveDirection(this.centerPos, direction, distance);
  }
}

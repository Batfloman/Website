import Formeln from "../Formeln.js";
import Input from "../input/Input.js";
import Polygon from "../physic/2d/boundingBox/Polygon.js";
import Vector2 from "../util/Vector2.js";
import { IMoveable } from "../propertys/IMoveable.js";
import WorldObject from "./WorldObject.js";

export default class MoveableObject extends WorldObject implements IMoveable {
  
  lockMovement: boolean = true;

  controles: Map<String, Function> = new Map();
  
  constructor(centerPos: Vector2, hitBox: Polygon, controles: Map<String, Function>) {
    super(centerPos, hitBox);
    
    if(!controles) throw new Error("no controles set!");

    this.controles = controles;
  }

  update(dt: number) {
    if(this.lockMovement) return;

    Input.pressedKeys.forEach(key => {
      if(this.controles.has(key)) {
        let func = this.controles.get(key)
        if(func instanceof Function) func(dt);
      }
    }) 
  }

  move(direction: number, distance: number): void {
    this.pos = Formeln.moveDirection(this.pos, direction, distance);
  }
}

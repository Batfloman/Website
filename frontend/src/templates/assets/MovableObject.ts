import Formeln from "../Formeln";
import Input from "../input/Input";
import Polygon from "../physic/2d/boundingBox/Polygon";
import Vector2 from "../util/Vector2";
import WorldObject from "./WorldObject";

export default class MoveableObject extends WorldObject {
  
  lockMovement: boolean = true;

  controles: Map<String, Function> = new Map();
  
  constructor(centerPos: Vector2, hitBox: Polygon, controles: Map<String, Function>) {
    super(centerPos, hitBox);
    
    if(!controles) throw new Error("no controles set!");

    this.controles = controles;
  }

  update(dt: number) {
    if(this.lockMovement) return;

    Input.getPressedKeys().forEach(key => {
      if(this.controles.has(key)) {
        let func = this.controles.get(key)
        if(func instanceof Function) func();
      }
    }) 
  }

  move(direction: number, distance: number) {
    this.centerPos = Formeln.moveDirection(this.centerPos, direction, distance);
  }
}

import MoveableObject from "../../templates/assets/MovableObject";
import WorldObject from "../../templates/assets/WorldObject";
import Formeln from "../../templates/Formeln";
import Input from "../../templates/input/Input";
import Polygon from "../../templates/physic/2d/boundingBox/Polygon";
import SAT from "../../templates/physic/2d/collision/SAT";
import Vector2 from "../../templates/util/Vector2";

export default class FromObject extends MoveableObject {

  // Border Color when not kolliding
  standardColor = "black";
  // Border Color when kollding
  kollisionColor = "white";
  // Color of Circle when selected
  selectedColor = "black";

  // Border Width when not kolliding
  standardWidth = 2;

  // ===== fun =====

  degPerSec = FromObject.randomSpeed(30, 180);
  
  static randomSpeed(min: number, max: number) {
    let value;
    do {
      value = Math.random()*max*2 - max;
    } while (value > -min && value < min)
    return value;
  }

  // ===== fun end =====

  //===================
  // ~~~~~ Class ~~~~~
  //===================

  constructor(centerPos: Vector2, hitBox: Polygon) {
    let controles = new Map();
    controles.set("w", (dt: number) => { this.move(0, 100 * dt / 1000) });
    controles.set("s", (dt: number) => { this.move(180, 100 * dt / 1000) });
    controles.set("a", (dt: number) => { this.move(-90, 100 * dt / 1000) });
    controles.set("d", (dt: number) => { this.move(90, 100 * dt / 1000) });
    controles.set("q", (dt: number) => { this.rotate(-90 * dt / 1000) });
    controles.set("e", (dt: number) => { this.rotate(90 * dt / 1000) });

    super(centerPos, hitBox, controles);

    Input.newEventListener("click", this, (event: MouseEvent) => {
      let mPos = this.canvas.getMousePosWithViewOffSet();
      if(Formeln.distance(this.centerPos, mPos) < 10) this.lockMovement = !this.lockMovement;
    });
  }

  update(dt: number) {
    super.update(dt);

    this.rotate(this.degPerSec * dt / 1000);
  }

  testOverlap(objects: WorldObject[]) {
    for(let i = 0; i < objects.length; i++) {
      let overlap = (SAT.potentialCollision(this, objects[i]) && SAT.testCollision(this, objects[i]));
      if(overlap) return true;
    }
    return false;
  }
}
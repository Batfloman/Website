import MoveableObject from "../../../../templates/assets/MovableObject.js";
import Formeln from "../../../../templates/Formeln.js";
import Input from "../../../../templates/input/Input.js";
import SAT from "../../../../templates/physic/2d/collision/SAT.js";
import Color from "../../../../templates/util/Color.js";

export default class FromObject extends MoveableObject {
  
  constructor(centerPos, hitBox) {
    let controles = new Map();
    controles.set("w", (dt) => { this.move(0, 100 * dt / 1000) });
    controles.set("s", (dt) => { this.move(180, 100 * dt / 1000) });
    controles.set("a", (dt) => { this.move(-90, 100 * dt / 1000) });
    controles.set("d", (dt) => { this.move(90, 100 * dt / 1000) });
    controles.set("q", (dt) => { this.rotate(-90 * dt / 1000) });
    controles.set("e", (dt) => { this.rotate(90 * dt / 1000) });

    super(centerPos, hitBox, controles);

    window.addEventListener("click", this);
    Input.newEventListener("click", this);
  }

  update(dt) {
    super.update(dt);

    this.hitBox.fillColor = this.lockMovement ?  Color.none : Color.get("black");

    this.hitBox.borderColor = this.testOverlap( this.system.findObjects(FromObject, this)) ? Color.get("red") : Color.get("black");

    if(this.lockMovement) this.rotate(90 * dt / 1000);
  }

  testOverlap(objects) {
    for(let i = 0; i < objects.length; i++) {
      let overlap = (SAT.potentialCollision(this, objects[i]) && SAT.testCollision(this, objects[i]));
      if(overlap) return true;
    }
    return false;
  }

  notify(event) {
    switch(event.type) {
      case "click":
        let mPos = this.canvas.getMousePosWithViewOffSet();
        if(Formeln.distance(this.centerPos, mPos) < 10) {
          this.lockMovement = !this.lockMovement;
        }
        break;
      default: 
        super.notify(event);
    }
  }
}
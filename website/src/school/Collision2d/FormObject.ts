import MoveableObject from "../../templates/2d/assets/MovableObject.js";
import { SceneObject } from "../../templates/assets/SceneObject.js";
import Formeln from "../../templates/2d/Formeln2.js";
import Input from "../../templates/input/Input.js";
import Polygon from "../../templates/2d/boundingBox/Polygon2.js";
import CircleCollision from "../../templates/2d/collision/CircleCollision.js";
import SAT from "../../templates/2d/collision/SAT.js";
import Vector2 from "../../templates/util/Vector2.js";
import Renderer from "../../templates/display/Renderer.js";
import { ICollideable } from "../../templates/2d/propertys/ICollideable.js";
import WorldObject2 from "../../templates/2d/assets/WorldObject2.js";
import Polygon2Helper from "../../templates/2d/collision/Polygon2Helper.js";
import Triangulation from "../../templates/2d/collision/Triangulation.js";

export default class FormObject extends MoveableObject {

  collides: boolean = false;

  // Border Color when not kolliding
  standardColor = "black";
  // fill Color 
  standardFillColor: string | undefined;
  // Border Color when kollding
  collisionColor = "white";
  // Color of Circle when selected
  selectedColor = "black";

  // Border Width when not kolliding
  standardWidth = 1.75;

  // if points should be drawn;
  drawPoints: boolean = false;
  // if triangles should be drawn;
  drawTriangles: boolean = true;

  // ===== fun =====

  degPerSec = FormObject.randomSpeed(30, 180);

  static randomSpeed(min: number, max: number) {
    let value;
    do {
      value = Math.random() * max * 2 - max;
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

    Input.newEventListener("mousedown", this, (event: MouseEvent) => {
      let mPos = Input.mPosHover.add(this.getCamara().offset);
      let distance = Formeln.distance(this.pos, mPos);
      if (distance < 10) {
        this.lockMovement = !this.lockMovement;
      }
    });
  }

  update(dt: number) {
    super.update(dt);

    this.rotate(this.degPerSec * dt / 1000);

    let objects = this.system.activeScene?.findObjects(FormObject);
    if (!!objects) this.collides = this.testOverlap(objects);
  }

  render(ctx: CanvasRenderingContext2D) {
    let pos = this.calcPosOnScreen();

    // change Color
    let borderColor = this.collides ? this.collisionColor : this.standardColor;
    let fillColor = this.lockMovement ? "rgba(0, 0, 0, 0)" : this.selectedColor;

    // Triangles
    if(this.drawTriangles) {
      ctx.lineWidth = .25;
      if (!Polygon2Helper.isConvex(this.hitBox)) {
        Triangulation.triangulate(this.hitBox.model).forEach(triangle => {
          Renderer.connectDots(ctx, this.getCamara().calcPointsPosOnScreen(Polygon2Helper.translatePoints(triangle.model, this.pos, this.angle)))
        });
      }
    }

    // draw Outline
    ctx.lineWidth = this.standardWidth;
    let fillColor2 = this.standardFillColor;
    Renderer.connectDots(ctx, this.calcPointsOnScreen(), borderColor, fillColor2);

    // draw Points
    if(this.drawPoints) {
      Renderer.drawDots(ctx, this.calcPointsOnScreen());
    }

    // middle Circle
    // ctx.beginPath();
    // ctx.arc(pos.x, pos.y, 10, 0, 360);
    // ctx.fill();
    // ctx.stroke();

    // outer Circle
    ctx.beginPath();
    ctx.strokeStyle = "rgba(45, 45, 45, 10)"
    ctx.lineWidth = 0.75;
    ctx.arc(pos.x, pos.y, Formeln.distance(this.pos, this.getFarthestPoint()), 0, 360);
    ctx.stroke();
  }

  testOverlap(objects: ICollideable[] | SceneObject[], exclude?: SceneObject[] | SceneObject): boolean {
    for (let i = 0; i < objects.length; i++) {
      let obj = objects[i];
      if (!(obj instanceof WorldObject2) || obj == this) continue;
      if(exclude instanceof SceneObject && exclude == obj) continue;
      else if(exclude instanceof Array && exclude.includes(obj)) continue;

      let overlap = (CircleCollision.potentialCollision(this, obj) && SAT.testCollision(this, obj));
      if (overlap) return true;
    }
    return false;
  }

  static testOverlap(testObj: ICollideable, objects: ICollideable[] | SceneObject[], exclude?: SceneObject[] | SceneObject): boolean {
    for (let i = 0; i < objects.length; i++) {
      let obj = objects[i];
      if (!(obj instanceof WorldObject2) || obj == testObj) continue;
      if(exclude instanceof SceneObject && exclude == obj) continue;
      else if(exclude instanceof Array && exclude.includes(obj)) continue;

      let overlap = (CircleCollision.potentialCollision(testObj, obj) && SAT.testCollision(testObj, obj));
      if (overlap) return true;
    }
    return false;
  }
}
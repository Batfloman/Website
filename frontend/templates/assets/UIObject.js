import Vector2 from "../util/Vector2.js";
import Polygon from "../physic/2d/boundingBox/Polygon.js";
import Rectangle from "../physic/2d/boundingBox/Rectangle.js";
import WorldObject from "./WorldObject.js";
import Color from "../util/Color.js";
import Formeln from "../Formeln.js";
import Input from "../input/Input.js";
import SAT from "../physic/2d/collision/SAT.js";

export default class UIObject extends WorldObject {
  /** @type {Vector2} */
  staticPos;
  /** @type {string} */
  content;
  /** @type {} */
  text = {
    "color" : "white",
    "font": "Arial",
    "fontSize": "25px",
    "xAlign": "center",
    "yAlign": "middle", 
  }

  constructor(pos, hitBox, content) {
    super(new Vector2(), hitBox);

    this.staticPos = !pos || !(pos instanceof Vector2) ? new Vector2(0,0) : pos;
    this.hitBox = !hitBox || !(hitBox instanceof Polygon) ? new Rectangle(50, 50) : hitBox;
    this.content = content;

    Input.newEventListener("click", this);
  }

  update(dt) {
    this.centerPos = new Vector2(
      this.staticPos.x + this.canvas.viewOffSet.x,
      this.staticPos.y + this.canvas.viewOffSet.y
    )
  }

  render(ctx) {
    this.hitBox.render(ctx, this.staticPos);

    ctx = this.canvas.htmlCanvas.getContext("2d")

    ctx.fillStyle = this.text.color;
    ctx.font = `${this.text.fontSize} ${this.text.font}`;
    ctx.textAlign = this.text.xAlign;
    ctx.textBaseline = this.text.yAlign;
    ctx.fillText(this.content, this.staticPos.x, this.staticPos.y)
  };

  notify(event) {
    this.centerPos = new Vector2(
      this.staticPos.x + this.canvas.viewOffSet.x,
      this.staticPos.y + this.canvas.viewOffSet.y
    )
    let click = new WorldObject(
      this.canvas.getMousePosWithViewOffSet(), 
      new Rectangle(5, 5)
    );
    // console.log(this, click)

    if(SAT.testCollision(this, click)) {
      this.clicked();
    };
  }

  clicked() {
    // console.log("click");
  }
  
  // (Hopefully) less calculation in Worldobject
  isOnScreen() {return true;}
}
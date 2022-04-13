import Vector2 from "../util/Vector2.js";
import Polygon from "../physic/2d/boundingBox/Polygon.js";
import Rectangle from "../physic/2d/boundingBox/Rectangle.js";
import WorldObject from "./WorldObject.js";
import Input from "../input/Input.js";
import SAT from "../physic/2d/collision/SAT.js";
import Color from "../util/Color.js";

export default class UIObject extends WorldObject {
  /** @type {Vector2} */
  staticPos;
  /** @type {string} */
  content;
  /** @type {} */
  style = {
    "color" : "white",
    "font": "Arial",
    "fontSize": "25px",
    "xAlign": "center",
    "yAlign": "middle", 
  }
  /** @type {Function} */
  action

  /**
   * 
   * @param {Vector2} pos 
   * @param {Polygon} hitBox 
   * @param {String} content 
   */
  constructor(pos, hitBox, content, action) {
    super(new Vector2(), hitBox);

    this.staticPos = !pos || !(pos instanceof Vector2) ? new Vector2(0,0) : pos;
    this.hitBox = !hitBox || !(hitBox instanceof Polygon) ? new Rectangle(50, 50) : hitBox;
    this.content = content;
    this.action = action;
    this.zIndex = 10;    
  }

  init(canvas, system) {
    super.init(canvas, system);

    Input.newEventListener("click", this, (event) => {
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
    });
  }

  update(dt) {
    this.centerPos = new Vector2(
      this.staticPos.x + this.canvas.viewOffSet.x,
      this.staticPos.y + this.canvas.viewOffSet.y
    )
  }

  render(ctx) {
    this.hitBox.render(ctx, this.staticPos);
    ctx.fillStyle = "red";
    ctx.fill();

    ctx = this.canvas.htmlCanvas.getContext("2d")

    ctx.fillStyle = this.style.color;
    ctx.font = `${this.style.fontSize} ${this.style.font}`;
    ctx.textAlign = this.style.xAlign;
    ctx.textBaseline = this.style.yAlign;
    ctx.fillText(this.content, this.staticPos.x, this.staticPos.y)
  };

  clicked() {
    this.action();
  }
  
  // (Hopefully) less calculation in Worldobject
  isOnScreen() {return true;}
}
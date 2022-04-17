import Vector2 from "../util/Vector2.js";
import Polygon from "../physic/2d/boundingBox/Polygon.js";
import Rectangle from "../physic/2d/boundingBox/Rectangle.js";
import WorldObject from "./WorldObject.js";
import Input from "../input/Input.js";
import SAT from "../physic/2d/collision/SAT.js";
import Canvas from "../display/Canvas.js";
import System from "../System.js";

export default class UIObject extends WorldObject {
  staticPos: Vector2;
  content: string;

  style = {
    "color" : "white",
    "font": "Arial",
    "fontSize": "25px",
    "xAlign": "center",
    "yAlign": "middle", 
  }
  action: Function;

  /**
   * 
   * @param {Vector2} pos 
   * @param {Polygon} hitBox 
   * @param {String} content 
   */
  constructor(pos: Vector2, hitBox: Polygon, content: string, action: Function) {
    super(new Vector2(0, 0), hitBox);

    this.staticPos = !pos || !(pos instanceof Vector2) ? new Vector2(0,0) : pos;
    this.hitBox = !hitBox || !(hitBox instanceof Polygon) ? new Rectangle(50, 50) : hitBox;
    this.content = content;
    this.action = action;
    this.zIndex = 10;    
  }

  init(canvas: Canvas, system: System) {
    super.init(canvas, system);

    Input.newEventListener("click", this, (event: Event) => {
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

  update(dt: number) {
    this.centerPos = new Vector2(
      this.staticPos.x + this.canvas.viewOffSet.x,
      this.staticPos.y + this.canvas.viewOffSet.y
    )
  }

  render(ctx: CanvasRenderingContext2D): void {
    super.render(ctx);
    ctx.fillStyle = "red";
    ctx.fill();

    ctx.fillStyle = this.style.color;
    ctx.font = `${this.style.fontSize} ${this.style.font}`;
    ctx.textAlign = "center"
    ctx.textBaseline = "middle";
    ctx.fillText(this.content, this.staticPos.x, this.staticPos.y)
  };

  clicked() {
    this.action();
  }
  
  // (Hopefully) less calculation in Worldobject
  isOnScreen() {return true;}
}
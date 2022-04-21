import Vector2 from "../../util/Vector2.js";
import Polygon from "../boundingBox/Polygon2.js";
import Rectangle from "../boundingBox/Rectangle.js";
import WorldObject from "./WorldObject2.js";
import Input from "../../input/Input.js";
import SAT from "../collision/SAT.js";
import Canvas from "../../display/Canvas.js";
import System from "../../System.js";
import Renderer from "../../display/Renderer.js";
import Polygon2Helper from "../collision/Polygon2Helper.js";

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

    this.pos = pos;
    this.staticPos = pos;
    this.hitBox = hitBox;
    this.content = content;
    this.action = action;
    this.zIndex = 10;    
  }

  init(system: System) {
    super.init(system);

    Input.newEventListener("click", this, (event: MouseEvent) => {
      this.pos = new Vector2(
        this.staticPos.x + this.getCamara().offset.x,
        this.staticPos.y + this.getCamara().offset.y
      )
      let click = new WorldObject(
        this.getCamara().getMousePosWithViewOffSet(new Vector2(event.offsetX, event.offsetY)), 
        new Rectangle(2, 2)
      );
  
      if(SAT.testCollision(this, click)) {
        this.clicked();
      };
    });
  }

  update(dt: number) {
    this.pos = new Vector2(
      this.staticPos.x + this.getCamara().offset.x,
      this.staticPos.y + this.getCamara().offset.y
    )
  }

  render(ctx: CanvasRenderingContext2D): void {
    this.translatePoints();
    
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    
    Renderer.connectDots(ctx, this.calcPointsOnScreen())
    
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
  
  isOnScreen() {return true;}
}
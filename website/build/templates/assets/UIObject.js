import Vector2 from "../util/Vector2.js";
import Polygon from "../physic/2d/boundingBox/Polygon.js";
import Rectangle from "../physic/2d/boundingBox/Rectangle.js";
import WorldObject from "./WorldObject.js";
import Input from "../input/Input.js";
import SAT from "../physic/2d/collision/SAT.js";
export default class UIObject extends WorldObject {
    constructor(pos, hitBox, content, action) {
        super(new Vector2(0, 0), hitBox);
        this.style = {
            "color": "white",
            "font": "Arial",
            "fontSize": "25px",
            "xAlign": "center",
            "yAlign": "middle",
        };
        this.staticPos = !pos || !(pos instanceof Vector2) ? new Vector2(0, 0) : pos;
        this.hitBox = !hitBox || !(hitBox instanceof Polygon) ? new Rectangle(50, 50) : hitBox;
        this.content = content;
        this.action = action;
        this.zIndex = 10;
    }
    init(canvas, system) {
        super.init(canvas, system);
        Input.newEventListener("click", this, (event) => {
            this.pos = new Vector2(this.staticPos.x + this.canvas.viewOffSet.x, this.staticPos.y + this.canvas.viewOffSet.y);
            let click = new WorldObject(this.canvas.getMousePosWithViewOffSet(), new Rectangle(5, 5));
            if (SAT.testCollision(this, click)) {
                this.clicked();
            }
            ;
        });
    }
    update(dt) {
        this.pos = new Vector2(this.staticPos.x + this.canvas.viewOffSet.x, this.staticPos.y + this.canvas.viewOffSet.y);
    }
    render(ctx) {
        super.render(ctx);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.fillStyle = this.style.color;
        ctx.font = `${this.style.fontSize} ${this.style.font}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.content, this.staticPos.x, this.staticPos.y);
    }
    ;
    clicked() {
        this.action();
    }
    isOnScreen() { return true; }
}

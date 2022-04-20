import Vector2 from "../../util/Vector2.js";
import Rectangle from "../boundingBox/Rectangle.js";
import WorldObject from "./WorldObject2.js";
import Input from "../../input/Input.js";
import SAT from "../collision/SAT.js";
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
        this.pos = pos;
        this.staticPos = pos;
        this.hitBox = hitBox;
        this.content = content;
        this.action = action;
        this.zIndex = 10;
    }
    init(system) {
        super.init(system);
        Input.newEventListener("click", this, (event) => {
            this.pos = new Vector2(this.staticPos.x + this.getCamara().offset.x, this.staticPos.y + this.getCamara().offset.y);
            let click = new WorldObject(this.getCamara().getMousePosWithViewOffSet(new Vector2(event.offsetX, event.offsetY)), new Rectangle(2, 2));
            if (SAT.testCollision(this, click)) {
                this.clicked();
            }
            ;
        });
    }
    update(dt) {
        this.pos = new Vector2(this.staticPos.x + this.getCamara().offset.x, this.staticPos.y + this.getCamara().offset.y);
    }
    render(ctx) {
        this.hitBox.translatePoints(this.staticPos);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.beginPath();
        let first = this.hitBox.points[0];
        ctx.moveTo(first.x, first.y);
        this.hitBox.points.forEach(point => {
            ctx.lineTo(point.x, point.y);
        });
        ctx.lineTo(first.x, first.y);
        ctx.stroke();
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

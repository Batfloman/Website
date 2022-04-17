"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vector2_1 = __importDefault(require("../util/Vector2"));
const Polygon_1 = __importDefault(require("../physic/2d/boundingBox/Polygon"));
const Rectangle_1 = __importDefault(require("../physic/2d/boundingBox/Rectangle"));
const WorldObject_1 = __importDefault(require("./WorldObject"));
const Input_1 = __importDefault(require("../input/Input"));
const SAT_1 = __importDefault(require("../physic/2d/collision/SAT"));
class UIObject extends WorldObject_1.default {
    constructor(pos, hitBox, content, action) {
        super(new Vector2_1.default(0, 0), hitBox);
        this.style = {
            "color": "white",
            "font": "Arial",
            "fontSize": "25px",
            "xAlign": "center",
            "yAlign": "middle",
        };
        this.staticPos = !pos || !(pos instanceof Vector2_1.default) ? new Vector2_1.default(0, 0) : pos;
        this.hitBox = !hitBox || !(hitBox instanceof Polygon_1.default) ? new Rectangle_1.default(50, 50) : hitBox;
        this.content = content;
        this.action = action;
        this.zIndex = 10;
    }
    init(canvas, system) {
        super.init(canvas, system);
        Input_1.default.newEventListener("click", this, (event) => {
            this.centerPos = new Vector2_1.default(this.staticPos.x + this.canvas.viewOffSet.x, this.staticPos.y + this.canvas.viewOffSet.y);
            let click = new WorldObject_1.default(this.canvas.getMousePosWithViewOffSet(), new Rectangle_1.default(5, 5));
            if (SAT_1.default.testCollision(this, click)) {
                this.clicked();
            }
            ;
        });
    }
    update(dt) {
        this.centerPos = new Vector2_1.default(this.staticPos.x + this.canvas.viewOffSet.x, this.staticPos.y + this.canvas.viewOffSet.y);
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
exports.default = UIObject;

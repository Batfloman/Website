"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Formeln2_js_1 = __importDefault(require("../2d/Formeln2.js"));
const Input_js_1 = __importDefault(require("../input/Input.js"));
const Rectangle_js_1 = __importDefault(require("../2d/boundingBox/Rectangle.js"));
const Vector2_js_1 = __importDefault(require("../util/Vector2.js"));
const Polygon2Helper_js_1 = __importDefault(require("../2d/collision/Polygon2Helper.js"));
class Camara {
    constructor(canvas) {
        this.angle = 0;
        this.canvas = canvas;
        this.pos = new Vector2_js_1.default();
        this.offset = new Vector2_js_1.default(canvas.htmlCanvas.width / -2, canvas.htmlCanvas.height / -2);
        this.hitBox = new Rectangle_js_1.default(canvas.htmlCanvas.width, canvas.htmlCanvas.height);
        this.lockMovement = true;
        this.scale = 1;
        Input_js_1.default.newEventListener("mousemove", this, (event) => {
            if (Input_js_1.default.pressedKeys.includes("0")) {
                let move = new Vector2_js_1.default(event.movementX, event.movementY);
                this.pos = this.pos.subtract(move);
                this.offset = this.offset.subtract(move);
            }
        });
        Input_js_1.default.newEventListener("resize", this, (event) => {
            this.hitBox = new Rectangle_js_1.default(canvas.htmlCanvas.width, canvas.htmlCanvas.height);
        });
        this.points = this.translatePoints();
    }
    calcPointPosOnScreen(point) {
        return point.subtract(this.offset);
    }
    calcPointsPosOnScreen(points) {
        let p = new Array();
        points.forEach(point => {
            p.push(point.subtract(this.offset));
        });
        return p;
    }
    getMousePosWithViewOffSet(without) {
        return without.add(this.offset);
    }
    // IMoveable
    translatePoints() {
        return Polygon2Helper_js_1.default.translatePoints(this.hitBox.model, this.pos, this.angle);
    }
    touches(obj) {
        throw new Error("Method not implemented.");
    }
    move(direction, distance) {
        this.pos = Formeln2_js_1.default.moveDirection(this.pos, direction, distance);
    }
}
exports.default = Camara;

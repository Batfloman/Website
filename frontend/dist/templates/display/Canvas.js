"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WorldObject_1 = __importDefault(require("../assets/WorldObject"));
const Input_1 = __importDefault(require("../input/Input"));
const Vector2_1 = __importDefault(require("../util/Vector2"));
class Canvas {
    constructor(htmlCanvas) {
        this.lockScrolling = true;
        this.lastPos = new Vector2_1.default(0, 0);
        this.htmlCanvas = htmlCanvas;
        Input_1.default.newEventListener("resize", this, this.resize);
        Input_1.default.newEventListener("mousemove", this, (event) => {
            if (!Input_1.default.mouseDown || this.lockScrolling)
                return;
            this.updateViewOffSet(event.movementX, event.movementY);
        });
        Input_1.default.newEventListener("touchmove", this, (event) => {
            if (this.lockScrolling)
                return;
            this.updateViewOffSet(event.touches[0].clientX - this.lastPos.x, event.touches[0].clientY - this.lastPos.y);
            this.lastPos = new Vector2_1.default(event.touches[0].clientX, event.touches[0].clientY);
        });
        Input_1.default.newEventListener("touchstart", this, (event) => {
            this.lastPos = new Vector2_1.default(event.touches[0].clientX, event.touches[0].clientY);
        });
        this.resize();
        this.viewOffSet = new Vector2_1.default(-this.htmlCanvas.width / 2, -(this.htmlCanvas.height / 2));
    }
    render(objects) {
        if (!objects)
            return;
        let ctx = this.htmlCanvas.getContext("2d");
        if (!ctx)
            return;
        ctx.clearRect(0, 0, this.htmlCanvas.width, this.htmlCanvas.height);
        objects.forEach(obj => {
            if (obj instanceof WorldObject_1.default && obj.isOnScreen()) {
                if (!!ctx)
                    obj.render(ctx);
            }
        });
    }
    getMousePosWithViewOffSet() {
        if (!this.viewOffSet)
            return new Vector2_1.default(0, 0);
        let mousePos = Input_1.default.getMousePosOffSet();
        let offSetted = new Vector2_1.default(mousePos.x + this.viewOffSet.x, mousePos.y + this.viewOffSet.y);
        return offSetted;
    }
    updateViewOffSet(xChange, yChange) {
        this.viewOffSet.x -= xChange;
        this.viewOffSet.y -= yChange;
    }
    resize() {
        this.htmlCanvas.width = this.htmlCanvas.getBoundingClientRect().width;
        this.htmlCanvas.height = this.htmlCanvas.getBoundingClientRect().height;
    }
}
exports.default = Canvas;

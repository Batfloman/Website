import Formeln from "../2d/Formeln2.js";
import Input from "../input/Input.js";
import Rectangle from "../2d/boundingBox/Rectangle.js";
import Vector2 from "../util/Vector2.js";
export default class Camara {
    constructor(canvas) {
        this.canvas = canvas;
        this.pos = new Vector2();
        this.offset = new Vector2(canvas.htmlCanvas.width / -2, canvas.htmlCanvas.height / -2);
        this.hitBox = new Rectangle(canvas.htmlCanvas.width, canvas.htmlCanvas.height);
        this.lockMovement = true;
        this.scale = 1;
        Input.newEventListener("mousemove", this, (event) => {
            if (Input.pressedKeys.includes("0")) {
                let move = new Vector2(event.movementX, event.movementY);
                this.pos = this.pos.subtract(move);
                this.offset = this.offset.subtract(move);
            }
        });
        Input.newEventListener("resize", this, (event) => {
            this.hitBox = new Rectangle(canvas.htmlCanvas.width, canvas.htmlCanvas.height);
        });
    }
    getMousePosWithViewOffSet(without) {
        return without.add(this.offset);
    }
    translatePoints() {
        return this.hitBox.translatePoints(this.pos);
    }
    touches(obj) {
        throw new Error("Method not implemented.");
    }
    move(direction, distance) {
        this.pos = Formeln.moveDirection(this.pos, direction, distance);
    }
}

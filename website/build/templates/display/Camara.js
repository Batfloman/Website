import Formeln from "../Formeln.js";
import Input from "../input/Input.js";
import Rectangle from "../physic/2d/boundingBox/Rectangle.js";
import Vector2 from "../util/Vector2.js";
export default class Camara {
    constructor(canvas) {
        this.pos = new Vector2(canvas.htmlCanvas.width / -2, canvas.htmlCanvas.height / -2);
        this.hitBox = new Rectangle(canvas.htmlCanvas.width, canvas.htmlCanvas.height);
        this.lockMovement = true;
        this.scale = 1;
        Input.newEventListener("mousemove", this, (event) => {
        });
    }
    move(direction, distance) {
        this.pos = Formeln.moveDirection(this.pos, direction, distance);
    }
    touches(obj) {
        throw new Error("Method not implemented.");
    }
}

import Input from "../input/Input.js";
import Polygon2Helper from "../physic/algorithms/Polygon2Helper.js";
import SAT from "../physic/algorithms/SAT.js";
import Rectangel from "../physic/boundingBox/Rectangel.js";
import Util from "../util/Util.js";
import Vector2 from "../util/Vector2.js";
export default class Camara {
    constructor(canvas, pos) {
        this.scale = 1;
        this.lockScaling = true;
        this.lockMovement = true;
        this.canvas = canvas;
        this.pos = !pos ? new Vector2() : pos;
        this.hitBox = new Rectangel(this.canvas.htmlCanvas.width, this.canvas.htmlCanvas.height);
        this.orientation = 0;
        this.points = this.translatePoints();
        Input.newEventListener("wheel", this, (event) => {
            if (this.lockScaling)
                return;
            if (!(event.target == this.canvas.htmlCanvas))
                return;
            if (event.deltaY < 0)
                this.scale *= 1.2;
            else if (event.deltaY > 0)
                this.scale *= 0.83333333333;
            this.translatePoints();
        });
        Input.newEventListener("mousemove", this, (event) => {
            if (this.lockMovement)
                return;
            if (!(event.target == this.canvas.htmlCanvas))
                return;
            if (Input.isLeftClick()) {
                this.pos.x -= event.movementX;
                this.pos.y += event.movementY;
            }
        });
    }
    moveDirection(direction, distance) {
        this.pos = Util.moveDirection(this.pos, direction, distance);
    }
    move(move) {
        this.pos = this.pos.add(move);
    }
    checkCollision(other) {
        return SAT.testCollision(this, other);
    }
    translatePoints() {
        this.points = [];
        this.hitBox.model.forEach((point) => {
            this.points.push(Polygon2Helper.translatePoint(point.scale(this.scale), this.pos, this.orientation));
        });
        return this.points;
    }
    getOffset() {
        return this.pos.subtract(new Vector2(this.canvas.width / 2, -this.canvas.height / 2));
    }
}

import Input from "../input/Input.js";
import Collision from "../physic/algorithms/Collision.js";
import Polygon2Helper from "../physic/algorithms/Polygon2Helper.js";
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
        Input.newEventListener("wheel", this, (event) => {
            if (this.lockScaling)
                return;
            if (!(event.target == this.canvas.htmlCanvas))
                return;
            if (event.deltaY < 0)
                this.scale *= 1.15;
            else if (event.deltaY > 0)
                this.scale *= 1 / 1.15;
        });
        Input.newEventListener("mousemove", this, (event) => {
            if (this.lockMovement)
                return;
            if (!(event.target == this.canvas.htmlCanvas))
                return;
            if (Input.isLeftClick()) {
                this.pos.x -= event.movementX / this.scale;
                this.pos.y += event.movementY / this.scale;
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
        return Collision.testCollision(this, other);
    }
    translatePoints() {
        let points = [];
        this.hitBox.model.forEach((point) => {
            points.push(Polygon2Helper.translatePoint(point.scale(1 / this.scale), this.pos, this.orientation));
        });
        this.hitBox.farthestPoint = Util.farthestPoint(new Vector2(), this.hitBox.model).scale(1 / this.scale);
        return points;
    }
    getOffset() {
        return new Vector2(this.canvas.width / 2, this.canvas.height / 2);
    }
}

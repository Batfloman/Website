"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormObject = exports.selectDistance = void 0;
const ControllableObject_js_1 = require("../../../../../lib/assets/objects/ControllableObject.js");
const Color_js_1 = require("../../../../../lib/util/Color.js");
const Vector2_js_1 = require("../../../../../lib/util/Vector2.js");
const Triangulation_js_1 = require("../../../../../lib/physic/algorithms/Triangulation.js");
const Util_js_1 = require("../../../../../lib/util/Util.js");
const Polygon2Helper_js_1 = require("../../../../../lib/physic/algorithms/Polygon2Helper.js");
const Input_js_1 = require("../../../../../lib/input/Input.js");
exports.selectDistance = 10;
class FormObject extends ControllableObject_js_1.ControllableObject {
    constructor(pos, hitBox, angle) {
        super(pos, hitBox, angle);
        this.collides = false;
        this.selected = false;
        this.rotationSpeed = Util_js_1.Util.math.random.between(45, 135) * Util_js_1.Util.math.random.mathSign();
        this.addControll("w", (dt) => {
            if (!this.selected)
                return;
            this.moveDirection(0, this.calc_valueChangeForDT((90 * 1) / this.camara.scaleValue, dt));
        });
        this.addControll("a", (dt) => {
            if (!this.selected)
                return;
            this.moveDirection(-90, this.calc_valueChangeForDT((90 * 1) / this.camara.scaleValue, dt));
        });
        this.addControll("s", (dt) => {
            if (!this.selected)
                return;
            this.moveDirection(180, this.calc_valueChangeForDT((90 * 1) / this.camara.scaleValue, dt));
        });
        this.addControll("d", (dt) => {
            if (!this.selected)
                return;
            this.moveDirection(90, this.calc_valueChangeForDT((90 * 1) / this.camara.scaleValue, dt));
        });
        this.addControll("q", (dt) => {
            if (!this.selected)
                return;
            this.rotate(this.calc_valueChangeForDT(90, dt));
        });
        this.addControll("e", (dt) => {
            if (!this.selected)
                return;
            this.rotate(this.calc_valueChangeForDT(-90, dt));
        });
        this.addControll("left", () => {
            if (!this.selected)
                return;
            Input_js_1.Input.isPressed("shift") ? this.rotate(1) : this.move(new Vector2_js_1.Vector2(-1, 0));
        }, 100);
        this.addControll("right", () => {
            if (!this.selected)
                return;
            Input_js_1.Input.isPressed("shift") ? this.rotate(-1) : this.move(new Vector2_js_1.Vector2(1, 0));
        }, 100);
        this.addControll("up", () => {
            if (!this.selected)
                return;
            this.move(new Vector2_js_1.Vector2(0, 1));
        }, 100);
        this.addControll("down", () => {
            if (!this.selected)
                return;
            this.move(new Vector2_js_1.Vector2(0, -1));
        }, 100);
    }
    update2(dt) {
        if (!this.selected) {
            this.rotate(this.calc_valueChangeForDT(this.rotationSpeed, dt) * this.game.speedMult);
        }
        let objects = this.world.findObjectsInNeighbouringChunks(this.chunk, FormObject, this);
        for (let obj of objects) {
            this.collides = this.isCollidingWith(obj);
            if (this.collides)
                break;
        }
    }
    render(renderer) {
        renderer.setLineWidth(3);
        renderer.setStrokeColor(this.collides ? Color_js_1.Color.get("white") : Color_js_1.Color.get("black"));
        renderer.setFillColor(this.collides ? Color_js_1.Color.get("white") : Color_js_1.Color.get("black"));
        renderer.renderPolygon(this.pos, this.hitBox, this.orientation, true, true);
        renderer.setLineWidth(0.5);
        if (!this.hitBox.isConvex) {
            let parts = Triangulation_js_1.Triangulation.triangulate(this);
            for (let part of parts) {
                renderer.renderPolygon(part.pos, part.hitBox, part.orientation, false, true);
            }
        }
        renderer.setLineWidth(3);
        renderer.setStrokeColor(Color_js_1.Color.get("black"));
        renderer.setFillColor(this.selected ? Color_js_1.Color.get("black") : Color_js_1.Color.none);
        renderer.renderCircle(this.pos, exports.selectDistance);
        renderer.setLineWidth(0.33);
        renderer.setFillColor(Color_js_1.Color.none);
        renderer.renderCircle(this.pos, this.hitBox.farthestDistance);
    }
    translatePoints() {
        return Polygon2Helper_js_1.Polygon2Helper.translatePoints(this.hitBox.model, this.pos, this.orientation);
    }
}
exports.FormObject = FormObject;

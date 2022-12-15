"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Camara = void 0;
const Input_js_1 = require("../input/Input.js");
const Collision_js_1 = require("../physic/algorithms/Collision.js");
const Polygon2Helper_js_1 = require("../physic/algorithms/Polygon2Helper.js");
const Rectangle_js_1 = require("../physic/boundingBox/Rectangle.js");
const Util_js_1 = require("../util/Util.js");
const Vector2_js_1 = require("../util/Vector2.js");
class Camara {
    constructor(canvas, pos) {
        this.alreadyTranslated = false;
        //#endregion
        // ==========================================================================================
        // #region Scaling
        // active state
        this.lockScaling = true;
        // "static" values
        this.zoomFactor = 1.15;
        this.maxZoomInAmount = Infinity;
        this.maxZoomOutAmount = Infinity;
        // change during runtime
        this.scaleAmount = 0;
        this.scaleValue = 1;
        //#endregion
        // ==========================================================================================
        //#region Moving
        // active state
        this.lockMovement = true;
        this.canvas = canvas;
        this.pos = !pos ? new Vector2_js_1.Vector2() : pos;
        this.hitBox = new Rectangle_js_1.Rectangle(this.canvas.htmlCanvas.width, this.canvas.htmlCanvas.height);
        this.orientation = 0;
        this.translatePoints();
        // mouse
        Input_js_1.Input.newEventListener("wheel", this, this.mouseWheel);
        Input_js_1.Input.newEventListener("mousemove", this, this.mouseMove);
        // touch
        Input_js_1.Input.newEventListener("touchmove", this, this.touchMove);
        Input_js_1.Input.newEventListener("touchend", this, () => (this.previousTouchPos = undefined));
        Input_js_1.Input.newEventListener("touchcancel", this, () => (this.previousTouchPos = undefined));
        // window
        Input_js_1.Input.newEventListener("resize", this, () => {
            this.hitBox = new Rectangle_js_1.Rectangle(this.canvas.htmlCanvas.width, this.canvas.htmlCanvas.height);
            this.alreadyTranslated = false;
        });
    }
    /** Returns the Vector from the top left corner to the center */
    getOffset() {
        return new Vector2_js_1.Vector2(this.canvas.width / 2, this.canvas.height / 2);
    }
    moveDirection(direction, distance) {
        this.pos = Util_js_1.Util.moveDirection(this.pos, direction, distance);
    }
    move(move) {
        this.pos = this.pos.add(move);
    }
    isCollidingWith(other) {
        return Collision_js_1.Collision.testCollision(this, other);
    }
    translatePoints() {
        if (this.alreadyTranslated)
            return this.translatedPoints;
        this.translatedPoints = [];
        for (let point of this.hitBox.model) {
            point = point.scale(1 / this.scaleValue);
            this.translatedPoints.push(Polygon2Helper_js_1.Polygon2Helper.translatePoint(point, this.pos, this.orientation));
        }
        this.hitBox.farthestDistance = this.getOffset()
            .scale(1 / this.scaleValue)
            .getMagnitude();
        this.alreadyTranslated = true;
        return this.translatedPoints;
    }
    mouseWheel(event) {
        if (this.lockScaling)
            return;
        event.deltaY < 0 ? this.zoomIn() : this.zoomOut();
        this.updateScaleValue();
        this.alreadyTranslated = false;
    }
    zoomIn() {
        if (this.scaleAmount >= this.maxZoomInAmount)
            return;
        this.scaleAmount++;
    }
    zoomOut() {
        if (this.scaleAmount <= -this.maxZoomOutAmount)
            return;
        this.scaleAmount--;
    }
    updateScaleValue() {
        this.scaleValue = Math.pow(this.zoomFactor, this.scaleAmount);
    }
    setScale(scale) {
        this.scaleAmount = scale;
        this.updateScaleValue();
        this.alreadyTranslated = false;
    }
    setMaxZoomInAmount(amount) {
        this.maxZoomInAmount = amount;
    }
    setMaxZoomOutAmount(amount) {
        this.maxZoomOutAmount = amount;
    }
    setZoomingFactor(factor) {
        this.zoomFactor = factor;
        this.alreadyTranslated = false;
    }
    setLockScaling(b) {
        this.lockScaling = b;
    }
    mouseMove(event) {
        if (this.lockMovement)
            return;
        if (!Input_js_1.Input.isLeftClick())
            return;
        this.pos.x -= event.movementX / this.scaleValue;
        this.pos.y += event.movementY / this.scaleValue;
        this.alreadyTranslated = false;
    }
    setLockMovement(b) {
        this.lockMovement = b;
    }
    touchMove(event) {
        if (this.lockMovement)
            return;
        const touch = event.touches[0] || event.changedTouches[0];
        const touchPos = new Vector2_js_1.Vector2(touch.clientX, touch.clientY);
        if (!this.previousTouchPos) {
            this.previousTouchPos = touchPos;
            return;
        }
        const move = touchPos.subtract(this.previousTouchPos);
        this.previousTouchPos = touchPos;
        this.pos.x -= move.x / this.scaleValue;
        this.pos.y += move.y / this.scaleValue;
        this.alreadyTranslated = false;
    }
}
exports.Camara = Camara;

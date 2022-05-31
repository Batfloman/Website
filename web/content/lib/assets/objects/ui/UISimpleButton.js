import { Input } from "../../../input/Input.js";
import { PointInPolygon } from "../../../physic/algorithms/PointInPolygon.js";
import { Polygon2Helper } from "../../../physic/algorithms/Polygon2Helper.js";
import { Rectangle } from "../../../physic/boundingBox/Rectangle.js";
import { Color } from "../../../util/Color.js";
import { Util } from "../../../util/Util.js";
import { Vector2 } from "../../../util/Vector2.js";
import { WorldObject } from "../WorldObject.js";
export class UISimpleButton extends WorldObject {
    constructor(staticPos, width, height, text = "Button") {
        super(new Vector2(), new Rectangle(0, 0), 0);
        this.fillColor = Color.get("white");
        this.borderColor = Color.get("black");
        this.textColor = Color.get("black");
        this.staticPos = staticPos;
        this.staticWidth = width;
        this.staticHeight = height;
        this.staticPosValue = this.calcStaticPosValue();
        this.text = text;
        this.zIndex = Infinity;
        Input.newEventListener("wheel", this, this.updateHitBox);
        Input.newEventListener("resize", this, this.updateStaticPosValue);
        Input.newEventListener("click", this, this.click);
    }
    init(game, canvas) {
        super.init(game, canvas);
        this.staticPosValue = this.calcStaticPosValue();
        this.updateHitBox();
    }
    click() {
        console.log("////7");
        console.log(this.pos);
        console.log(Util.position.staticPos_to_worldPos(this.camara, Input.mPosHover));
        if (PointInPolygon.isPointInsidePolygon(Util.position.staticPos_to_worldPos(this.camara, Input.mPosHover), this)) {
            this.action();
        }
    }
    action() {
        console.warn("Button has no Action!");
    }
    update2(dt) {
        if (Input.isLeftClick())
            this.alreadyTranslated = false;
    }
    render(renderer) {
        renderer.setStrokeColor(this.borderColor);
        renderer.setFillColor(this.fillColor);
        renderer.setLineWidth(5);
        renderer.renderStaticRectangle(this.staticPosValue, Util.position.convertWidthPercentInValue(this.canvas, this.staticWidth), Util.position.convertHeightPercentInValue(this.canvas, this.staticHeight), false);
        renderer.setFillColor(this.textColor);
        renderer.renderStaticText(this.staticPosValue, this.text);
    }
    shouldRender() {
        return true;
    }
    shouldUpdate() {
        return true;
    }
    translatePoints() {
        if (this.alreadyTranslated)
            return this.translatedPoints;
        this.pos = Util.position.staticPos_to_worldPos(this.camara, this.staticPosValue);
        this.translatedPoints = [];
        for (let point of this.hitBox.model) {
            point = point.scale(1 / this.game.getCamara().scaleValue);
            this.translatedPoints.push(Polygon2Helper.translatePoint(point, this.pos, this.orientation));
        }
        this.alreadyTranslated = true;
        return this.translatedPoints;
    }
    updateHitBox() {
        this.hitBox = new Rectangle(Util.position.convertWidthPercentInValue(this.canvas, this.staticWidth) /
            this.camara.scaleValue, Util.position.convertHeightPercentInValue(this.canvas, this.staticHeight) /
            this.camara.scaleValue);
        this.alreadyTranslated = false;
    }
    updateStaticPosValue() {
        this.staticPosValue = this.calcStaticPosValue();
    }
    calcStaticPosValue() {
        if (!this.game)
            return new Vector2();
        if (this.staticPos instanceof Vector2) {
            return Util.position.convertPercentInValue(this.canvas, this.staticPos.x.toString(), this.staticPos.y.toString());
        }
        return Util.position.convertStaticPosInValue(this.game.getCamara(), this.staticPos);
    }
}

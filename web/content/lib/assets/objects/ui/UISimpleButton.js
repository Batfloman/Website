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
        super(new Vector2(), new Rectangle(width, height), 0);
        this.fillColor = Color.get("white");
        this.borderColor = Color.get("black");
        this.textColor = Color.get("black");
        this.staticPos = staticPos;
        this.staticPosValue = this.calcStaticPosValue();
        this.staticWidth = width;
        this.staticHeight = height;
        this.text = text;
        this.zIndex = Infinity;
        Input.newEventListener("wheel", this, () => {
            this.hitBox = new Rectangle((this.staticWidth / 100) * this.canvas.htmlCanvas.width, (this.staticHeight / 100) * this.canvas.htmlCanvas.height);
            this.staticPosValue = this.calcStaticPosValue();
            this.alreadyTranslated = false;
        });
    }
    init(game, canvas) {
        super.init(game, canvas);
        this.staticPosValue = this.calcStaticPosValue();
    }
    update2(dt) {
        if (Input.isLeftClick()) {
            this.alreadyTranslated = false;
            PointInPolygon.isPointInsidePolygon(Util.position.staticPos_to_worldPos(this.game.getCamara(), Input.mPosHover), this);
        }
    }
    render(renderer) {
        renderer.setStrokeColor(this.borderColor);
        renderer.setFillColor(this.fillColor);
        renderer.setLineWidth(5);
        renderer.renderRectangle(Util.position.staticPos_to_worldPos(this.game.getCamara(), this.staticPosValue), this.hitBox.width, this.hitBox.height);
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
        this.pos = this.calcWorldPos();
        this.translatedPoints = [];
        for (let point of this.hitBox.model) {
            point = point.scale(1 / this.game.getCamara().scaleValue);
            this.translatedPoints.push(Polygon2Helper.translatePoint(point, this.pos, this.orientation));
        }
        this.alreadyTranslated = true;
        return this.translatedPoints;
    }
    calcStaticPosValue() {
        if (!this.game)
            return new Vector2();
        if (this.staticPos instanceof Vector2) {
            return Util.position.convertPercentInValue(this.canvas, this.staticPos.x.toString(), this.staticPos.y.toString());
        }
        return Util.position.convertStaticPosInValue(this.game.getCamara(), this.staticPos);
    }
    calcWorldPos() {
        const camara = this.game.getCamara();
        return this.staticPosValue.subtract(camara.getOffset()).add(camara.pos);
    }
}

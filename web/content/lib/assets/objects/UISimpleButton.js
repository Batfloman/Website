import { Input } from "../../input/Input";
import { PointToPolygon } from "../../physic/algorithms/PointToPolygon";
import { Rectangle } from "../../physic/boundingBox/Rectangle";
import { Color } from "../../util/Color";
import { Vector2 } from "../../util/Vector2";
import { WorldObject } from "./WorldObject";
export class UISimpleButton extends WorldObject {
    constructor(staticPos, width, height) {
        super(new Vector2(), new Rectangle(width, height), 0);
        this.color = Color.get("white");
        this.staticPos = staticPos;
        this.zIndex = Infinity;
    }
    update2(dt) {
        if (Input.isLeftClick()) {
            PointToPolygon.isPointInsidePolygon(Input.mPosHover, this);
        }
    }
    render(renderer) {
        console.log("render");
        renderer.setStrokeColor(Color.none);
        renderer.setFillColor(this.color);
        renderer.renderStaticRectangle(this.staticPos, this.hitBox.width.toString(), this.hitBox.height.toString());
    }
    translatePoints() {
        if (this.alreadyTranslated)
            return this.translatedPoints;
        let pos = new Vector2();
        this.translatedPoints = this.hitBox.translatePoints(pos, this.orientation);
        return this.translatedPoints;
    }
}

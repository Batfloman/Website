import { Input } from "../../../input/Input.js";
import { PointInPolygon } from "../../../physic/algorithms/PointInPolygon.js";
import { Rectangle } from "../../../physic/boundingBox/Rectangle.js";
import { Color } from "../../../util/Color.js";
import { Util } from "../../../util/Util.js";
import { Vector2 } from "../../../util/Vector2.js";
import { WorldObject } from "../WorldObject.js";
export class UISimpleButton extends WorldObject {
    // Colors
    fillColor = Color.get("white");
    borderColor = Color.get("black");
    textColor = Color.get("black");
    // static Position
    staticPos;
    // on Canvas
    staticPosValue;
    // Percent Value
    staticWidth;
    staticHeight;
    text;
    constructor(staticPos, width, height, text = "Button") {
        super(new Vector2(), new Rectangle(0, 0), 0);
        this.staticPos = staticPos;
        this.staticWidth = width;
        this.staticHeight = height;
        this.staticPosValue = this.calcStaticPosValue();
        this.text = text;
        this.zIndex = Infinity;
        Input.newEventListener("wheel", this, () => {
            this.updateHitBox();
            this.updateWorldPos();
        });
        Input.newEventListener("resize", this, this.updateStaticPosValue);
        Input.newEventListener("click", this, this.click);
    }
    // @override
    init(game, canvas) {
        super.init(game, canvas);
        this.staticPosValue = this.calcStaticPosValue();
        this.updateHitBox();
        this.updateWorldPos();
    }
    click() {
        if (PointInPolygon.isPointInsidePolygon(Util.position.staticPos_to_worldPos(Input.mPos, this.camara), this)) {
            this.action();
        }
    }
    // override this method
    action() {
        console.warn("Button has no Action!");
        /*
          button.action = () => {
            *method implementation*
          }
        */
    }
    // ==========================================================================================
    // #region gametick
    update(dt) {
        if (Input.isLeftClick())
            this.alreadyTranslated = false;
    }
    render(renderer) {
        // button
        renderer.setStrokeColor(this.borderColor);
        renderer.setFillColor(this.fillColor);
        renderer.setLineWidth(5);
        // renderer.renderRectangle(this.pos, this.hitBox.width, this.hitBox.height);
        renderer.renderStaticRectangle(this.staticPosValue, this.staticWidth, this.staticHeight, false);
        // text
        renderer.setFillColor(this.textColor);
        renderer.renderStaticText(this.staticPosValue, this.text);
    }
    shouldRender() {
        return true;
    }
    shouldUpdate() {
        return true;
    }
    //#endregion
    // ==========================================================================================
    // #region collision & stuff
    translatePoints() {
        this.updateWorldPos();
        return super.translatePoints();
    }
    //#endregion
    // ==========================================================================================
    // #region static pos & ...
    updateHitBox() {
        this.hitBox = new Rectangle(Util.position.convertWidthPercentInValue(this.canvas, this.staticWidth) /
            this.camara.scaleValue, Util.position.convertHeightPercentInValue(this.canvas, this.staticHeight) /
            this.camara.scaleValue);
        this.alreadyTranslated = false;
    }
    updateStaticPosValue() {
        this.staticPosValue = this.calcStaticPosValue();
    }
    updateWorldPos() {
        this.pos = Util.position.staticPos_to_worldPos(this.staticPosValue, this.camara);
    }
    calcStaticPosValue() {
        if (!this.game)
            return new Vector2();
        if (this.staticPos instanceof Vector2) {
            return Util.position.convertPercentInValue(this.canvas, this.staticPos.x.toString(), this.staticPos.y.toString());
        }
        return Util.position.convertStaticPosInValue(this.staticPos, this.camara);
    }
}

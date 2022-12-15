"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UISimpleButton = void 0;
const Input_js_1 = require("../../../input/Input.js");
const PointInPolygon_js_1 = require("../../../physic/algorithms/PointInPolygon.js");
const Rectangle_js_1 = require("../../../physic/boundingBox/Rectangle.js");
const Color_js_1 = require("../../../util/Color.js");
const Util_js_1 = require("../../../util/Util.js");
const Vector2_js_1 = require("../../../util/Vector2.js");
const WorldObject_js_1 = require("../WorldObject.js");
class UISimpleButton extends WorldObject_js_1.WorldObject {
    constructor(staticPos, width, height, text = "Button") {
        super(new Vector2_js_1.Vector2(), new Rectangle_js_1.Rectangle(0, 0), 0);
        // Colors
        this.fillColor = Color_js_1.Color.get("white");
        this.borderColor = Color_js_1.Color.get("black");
        this.textColor = Color_js_1.Color.get("black");
        this.staticPos = staticPos;
        this.staticWidth = width;
        this.staticHeight = height;
        this.staticPosValue = this.calcStaticPosValue();
        this.text = text;
        this.zIndex = Infinity;
        Input_js_1.Input.newEventListener("wheel", this, () => {
            this.updateHitBox();
            this.updateWorldPos();
        });
        Input_js_1.Input.newEventListener("resize", this, this.updateStaticPosValue);
        Input_js_1.Input.newEventListener("click", this, this.click);
    }
    // @override
    init(game, canvas) {
        super.init(game, canvas);
        this.staticPosValue = this.calcStaticPosValue();
        this.updateHitBox();
        this.updateWorldPos();
    }
    click() {
        if (PointInPolygon_js_1.PointInPolygon.isPointInsidePolygon(Util_js_1.Util.position.staticPos_to_worldPos(Input_js_1.Input.mPos, this.camara), this)) {
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
        if (Input_js_1.Input.isLeftClick())
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
        this.hitBox = new Rectangle_js_1.Rectangle(Util_js_1.Util.position.convertWidthPercentInValue(this.canvas, this.staticWidth) /
            this.camara.scaleValue, Util_js_1.Util.position.convertHeightPercentInValue(this.canvas, this.staticHeight) /
            this.camara.scaleValue);
        this.alreadyTranslated = false;
    }
    updateStaticPosValue() {
        this.staticPosValue = this.calcStaticPosValue();
    }
    updateWorldPos() {
        this.pos = Util_js_1.Util.position.staticPos_to_worldPos(this.staticPosValue, this.camara);
    }
    calcStaticPosValue() {
        if (!this.game)
            return new Vector2_js_1.Vector2();
        if (this.staticPos instanceof Vector2_js_1.Vector2) {
            return Util_js_1.Util.position.convertPercentInValue(this.canvas, this.staticPos.x.toString(), this.staticPos.y.toString());
        }
        return Util_js_1.Util.position.convertStaticPosInValue(this.staticPos, this.camara);
    }
}
exports.UISimpleButton = UISimpleButton;

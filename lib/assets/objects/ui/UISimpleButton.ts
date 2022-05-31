import { Canvas } from "../../../display/Canvas.js";
import { Renderer } from "../../../display/Renderer.js";
import { Game } from "../../../games/Game.js";
import { Input } from "../../../input/Input.js";
import { PointInPolygon } from "../../../physic/algorithms/PointInPolygon.js";
import { Polygon2Helper } from "../../../physic/algorithms/Polygon2Helper.js";
import { Rectangle } from "../../../physic/boundingBox/Rectangle.js";
import { Color } from "../../../util/Color.js";
import { Util, staticPosition } from "../../../util/Util.js";
import { Vector2 } from "../../../util/Vector2.js";
import { WorldObject } from "../WorldObject.js";

export class UISimpleButton extends WorldObject<Rectangle> {
  // Colors
  fillColor: Color = Color.get("white");
  borderColor: Color = Color.get("black");
  textColor: Color = Color.get("black");

  // static Position
  staticPos: Vector2 | staticPosition;
  // on Canvas
  staticPosValue: Vector2;

  // Percent Value
  staticWidth: string;
  staticHeight: string;

  text: string;

  constructor(
    staticPos: Vector2 | staticPosition,
    width: string,
    height: string,
    text: string = "Button"
  ) {
    super(new Vector2(), new Rectangle(0, 0), 0);

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

  // @override
  init(game: Game, canvas: Canvas) {
    super.init(game, canvas);

    this.staticPosValue = this.calcStaticPosValue();
    this.updateHitBox();
  }

  click() {
    if (
      PointInPolygon.isPointInsidePolygon(
        Util.position.staticPos_to_worldPos(this.camara, Input.mPosHover),
        this
      )
    ) {
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

  update2(dt: number): void {
    if (Input.isLeftClick()) this.alreadyTranslated = false;
  }
  render(renderer: Renderer): void {
    // button
    renderer.setStrokeColor(this.borderColor);
    renderer.setFillColor(this.fillColor);
    renderer.setLineWidth(5);

    renderer.renderStaticRectangle(
      this.staticPosValue,
      Util.position.convertWidthPercentInValue(this.canvas, this.staticWidth),
      Util.position.convertHeightPercentInValue(this.canvas, this.staticHeight),
      false
    );
    // text
    renderer.setFillColor(this.textColor);
    renderer.renderStaticText(this.staticPosValue, this.text);
  }

  shouldRender(): boolean {
    return true;
  }
  shouldUpdate(): boolean {
    return true;
  }

  //#endregion

  // ==========================================================================================
  // #region collision & stuff

  translatePoints(): Vector2[] {
    if (this.alreadyTranslated) return this.translatedPoints;

    this.pos = this.calcWorldPos();

    this.translatedPoints = [];
    for (let point of this.hitBox.model) {
      point = point.scale(1 / this.game.getCamara().scaleValue);
      this.translatedPoints.push(Polygon2Helper.translatePoint(point, this.pos, this.orientation));
    }

    this.alreadyTranslated = true;

    return this.translatedPoints;
  }

  //#endregion

  // ==========================================================================================
  // #region static pos & ...

  updateHitBox() {
    this.hitBox = new Rectangle(
      Util.position.convertWidthPercentInValue(this.canvas, this.staticWidth) /
        this.camara.scaleValue,
      Util.position.convertHeightPercentInValue(this.canvas, this.staticHeight) /
        this.camara.scaleValue
    );
    this.alreadyTranslated = false;
  }

  updateStaticPosValue() {
    this.staticPosValue = this.calcStaticPosValue();
  }

  calcStaticPosValue(): Vector2 {
    if (!this.game) return new Vector2();

    if (this.staticPos instanceof Vector2) {
      return Util.position.convertPercentInValue(
        this.canvas,
        this.staticPos.x.toString(),
        this.staticPos.y.toString()
      );
    }
    return Util.position.convertStaticPosInValue(this.game.getCamara(), this.staticPos);
  }

  calcWorldPos() {
    const camara = this.game.getCamara();

    return this.staticPosValue.subtract(camara.getOffset()).add(camara.pos);
  }

  //#endregion
}

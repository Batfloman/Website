import Renderer, { staticPosition } from "../../../display/Renderer.js";
import Input from "../../../input/Input.js";
import PointToPolygon from "../../../physic/algorithms/PointToPolygon.js";
import Rectangle from "../../../physic/boundingBox/Rectangle.js";
import { Color } from "../../../util/Color.js";
import Vector2 from "../../../util/Vector2.js";
import { WorldObject } from "../WorldObject.js";

export default class UISimpleButton extends WorldObject<Rectangle> {
  color: Color = Color.get("white");

  staticPos: Vector2 | staticPosition;

  constructor(staticPos: Vector2 | staticPosition, width: number, height: number) {
    super(new Vector2(), new Rectangle(width, height), 0);

    this.staticPos = staticPos;
    this.zIndex = Infinity;
  }

  update2(dt: number): void {
    if (Input.isLeftClick()) {
      PointToPolygon.isPointInsidePolygon(Input.mPosHover, this);
    }
  }
  render(renderer: Renderer): void {
    console.log("render");
    renderer.setStrokeColor(Color.none);
    renderer.setFillColor(this.color);
    renderer.renderStaticRectangle(
      this.staticPos,
      this.hitBox.width.toString(),
      this.hitBox.height.toString()
    );
  }

  translatePoints(): Vector2[] {
    if (this.alreadyTranslated) return this.translatedPoints;

    let pos = new Vector2(); // TODO calc worldPos
    this.translatedPoints = this.hitBox.translatePoints(pos, this.orientation);
    return this.translatedPoints;
  }
}

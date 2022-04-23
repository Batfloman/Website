import Polygon2 from "../2d/boundingBox/Polygon2.js";
import Polygon2Helper from "../2d/collision/Polygon2Helper.js";
import Color from "../util/Color.js";
import Vector2 from "../util/Vector2.js";

export default class Renderer {
  static connectDots(ctx: CanvasRenderingContext2D, points: Vector2[], borderColor?: Color | string, fillColor?: Color | string) {

    ctx.fillStyle = !fillColor ? "rgba(0, 0, 0, 0)" : fillColor instanceof Color ? fillColor.getRGBValue() : fillColor;
    ctx.strokeStyle = !borderColor ? "rgb(0, 0, 0)" : borderColor instanceof Color ? borderColor.getRGBValue() : borderColor;

    ctx.beginPath();

    let first = points[0];
    ctx.moveTo(first.x, first.y);
    points.forEach(point => {
      ctx.lineTo(point.x, point.y);
    })
    ctx.lineTo(first.x, first.y);
    ctx.stroke();
  }

  static drawDots(ctx: CanvasRenderingContext2D, points: Vector2[], borderColor?: Color | string, fillColor?: Color | string) {
    ctx.fillStyle = !fillColor ? "rgba(0, 0, 0, 0)" : fillColor instanceof Color ? fillColor.getRGBValue() : fillColor;
    ctx.strokeStyle = !borderColor ? "rgb(0, 0, 0)" : borderColor instanceof Color ? borderColor.getRGBValue() : borderColor;

    points.forEach(point => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 3, 0, 360);
      ctx.fill();
      ctx.stroke();
    })
  }
}
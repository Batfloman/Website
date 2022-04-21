import Color from "../util/Color.js";
export default class Renderer {
    static renderPolygon2(ctx, polygon, borderColor, fillColor) {
        ctx.fillStyle = !fillColor ? "rgba(0, 0, 0, 0)" : fillColor instanceof Color ? fillColor.getRGBValue() : fillColor;
        ctx.strokeStyle = !borderColor ? "rgb(0, 0, 0)" : borderColor instanceof Color ? borderColor.getRGBValue() : borderColor;
        ctx.beginPath();
        let first = polygon.points[0];
        ctx.moveTo(first.x, first.y);
        polygon.points.forEach(point => {
            ctx.lineTo(point.x, point.y);
        });
        ctx.lineTo(first.x, first.y);
        ctx.stroke();
    }
}

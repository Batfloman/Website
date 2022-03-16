import Formeln from "../../../Formeln.js";
import Vector2 from "../../../util/Vector2.js";
import Color from "../../../util/Color.js";

export default class Polygon {
  /** @type {Vector2[]} - save the points relative to a 0, 0 center with 0° rotation */
  model = new Array();
  /** @type {number} - orientation angle in degree */
  angle = 0;
  /** @type {Vector2[]} - translated points*/
  points;

  /** @type {Color} */
  borderColor;
  /** @type {Color} */
  fillColor;

  constructor(centerPos, radius, numVerticies) {
    this.centerPos = centerPos;

    this.model = new Array();
    for(let i = 0; i < numVerticies; i++) {
      let angle = (360 / numVerticies) * i;
      this.model.push( Formeln.moveDirection(new Vector2(0,0), angle, radius));
    }
  }

  render(ctx, pos) {
    this.translatePoints(pos);

    ctx.strokeStyle = !this.borderColor ? Color.get("black") : this.borderColor.getRGBValue();
    ctx.fillStyle = !this.fillColor ? "rgba(0, 0, 0, 0)" : this.fillColor.getRGBValue();
    
    ctx.beginPath()
    ctx.arc(pos.x, pos.y, 10, 0, 360);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    let first = this.points[0];
    ctx.moveTo(first.x, first.y);
    this.points.forEach(point => {
      ctx.lineTo(point.x, point.y);
    })
    ctx.lineTo(first.x, first.y);  
    ctx.stroke();
  }

  translatePoints(pos) {
    this.points = new Array();

    this.model.forEach(point => {
      this.points.push(Formeln.rotateAroundCenter(
        pos,
        new Vector2(
          point.x + pos.x,
          point.y + pos.y
        ),
        this.angle
      ))
    })
  }

  centerModel() {
    let centerX = 0;
    let centerY = 0;
    this.model.forEach(point => {
      centerX += point.x;
      centerY += point.y;
    })
    let moveX = centerX / this.model.length;
    let moveY = centerY / this.model.length;
    this.model.forEach(point => {
      point.x -= Math.round(moveX*100) / 100;
      point.y -= Math.round(moveY*100) / 100;
    })
  }

  setPos(pos) { this.centerPos = pos;}
  moveX(x) { this.centerPos.x += x;}
  moveY(y) { this.centerPos.y += y;}

  setAngle(angle) { this.angle = angle;}
  rotate(degree) { 
    this.angle += degree;
    this.angle %= 360;
  }
}
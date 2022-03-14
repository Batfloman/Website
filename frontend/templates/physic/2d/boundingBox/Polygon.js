import Formeln from "../../../Formeln.js";
import Vector2 from "../../../util/Vector2.js";

export default class HitBox {
  model = new Array();
  /** @type {Vector2} */
  centerPos;
  /** @type {number} */
  angle = 0;
  /** @type {Vector2[]} */
  points;

  constructor(centerPos, radius, numVerticies) {
    this.centerPos = centerPos;

    this.model = new Array();
    for(let i = 0; i < numVerticies; i++) {
      let angle = (360 / numVerticies) * i;
      this.model.push( Formeln.moveDirection(new Vector2(0,0), angle, radius));
    }
  }

  render(ctx) {
    this.translatePoints();
    
    ctx.beginPath()
    ctx.arc(this.centerPos.x, this.centerPos.y, 10, 0, 360);
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

  translatePoints() {
    this.points = new Array();

    this.model.forEach(point => {
      this.points.push(Formeln.rotateAroundCenter(
        this.centerPos,
        new Vector2(
          point.x + this.centerPos.x,
          point.y + this.centerPos.y
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

    this.points = this.model;
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
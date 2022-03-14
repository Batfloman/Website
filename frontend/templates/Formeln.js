import Vector2 from "./util/Vector2.js"

export default class Formeln {
  static calcHypotenuse(side1, side2) {
    return Math.sqrt( (Math.pow(side1, 2) + Math.pow(side2, 2)));
  }

  static distance(point1, point2) {
    return Formeln.calcHypotenuse(
      Math.abs(point1.x) - Math.abs(point2.x), 
      Math.abs(point1.y) - Math.abs(point2.y)
    );
  }

  static closestPoint(mainPoint, points) {
    return Formeln.closestPoint(mainPoint, points, null);
  }

  static closestPoint(mainPoint, points, exclude) {
    let closest;
    let closestDistance;
    points.forEach(point => {
      if(mainPoint == point) return;
      if(exclude instanceof Vector2 && point == exclude) return;
      if(exclude instanceof Array && exclude.includes(point)) return;

      let distance = Formeln.distance(mainPoint, point);
      if(!closest || !closestDistance || distance < closestDistance) {
        closest = point;
        closestDistance = distance;
      }
    })
    return closest;
  }

  static moveDirection(start, direction, distance) {
    let moveX = Math.sin( Formeln.toRadian(direction)) * distance;
    let moveY = -Math.cos( Formeln.toRadian(direction)) * distance;

    return new Vector2(start.x + moveX, start.y + moveY);
  }

  static rotateAroundCenter(center, point, angle) {
    let xRot = Math.cos(Formeln.toRadian(angle)) * (point.x - center.x) - Math.sin(Formeln.toRadian(angle)) * (point.y - center.y) + center.x;
    let yRot = Math.sin(Formeln.toRadian(angle)) * (point.x - center.x) + Math.cos(Formeln.toRadian(angle)) * (point.y - center.y) + center.y;

    return new Vector2(xRot, yRot);
  }

  static toRadian(degree) {
    return degree * Math.PI / 180;
  }
}
import Vector from "../../../../templates/util/Vector2";

export default class Body {
  pos = new Vector(0, 0);
  points = new Array();

  constructor(x, y, amountPoints) {
    this.pos.x = x;
    this.pos.y = y;

    amountPoints = !amountPoints || amountPoints <= 0 ? 5 : amountPoints;
    for(let i = 0; i < amountPoints; i++) {
      
    }
  }
}
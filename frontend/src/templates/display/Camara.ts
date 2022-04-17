import Vector2 from "../util/Vector2.js";
import Canvas from "./Canvas.js";

export default class Camara {
  position!: Vector2;
  resolution = new Vector2(0,0);
  scale = 1;

  constructor(canvas: Canvas) {
    
  }
}
import Canvas from "../../../../templates/display/Canvas.js"
import System from "../../../../templates/System.js";
import Vector2 from "../../../../templates/util/Vector2.js";
import Polygon from "../../../../templates/physic/2d/boundingBox/Polygon.js";
import Formeln from "../../../../templates/Formeln.js";
import Rectangle from "../../../../templates/physic/2d/boundingBox/Rectangle.js";

window.onload = () => {
  let canvas = document.getElementById("scene");
  let c = new Canvas(canvas);

  let s = new System(c);

  for(let i = 0; i < 10; i++) {
    let start = new Vector2(Math.floor(Math.random()*canvas.width), Math.floor(Math.random()*canvas.height));
    let form = new Polygon(start, Math.floor(Math.random()*75) + 25, Math.ceil(Math.random()*10) + 2);
    s.addObject(form);
  }

  s.tick();
  setInterval(() => {
    s.tick();
  }, 10);
}
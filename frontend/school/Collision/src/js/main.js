import Canvas from "../../../../templates/display/Canvas.js"
import System from "../../../../templates/System.js";
import Vector2 from "../../../../templates/util/Vector2.js";
import Polygon from "../../../../templates/physic/2d/boundingBox/Polygon.js";
import Formeln from "../../../../templates/Formeln.js";
import WorldObject from "../../../../templates/assets/WorldObject.js";
import MoveableObject from "../../../../templates/assets/MovableObject.js";
import Form from "./Form.js";
import FromObject from "./FormObject.js";
import ConvexIrregular from "./ConvexIrregular.js";
import Rectangle from "../../../../templates/physic/2d/boundingBox/Rectangle.js";

window.onload = () => {
  let canvas = document.getElementById("scene");
  let c = new Canvas(canvas);
  c.lockMovement = false;

  let s = new System(c);

  // s.addObject(new FromObject(
  //   new Vector2(100, 100),
  //   new Form(50, 4, 45)
  // ))
  // s.addObject(new FromObject(
  //   new Vector2(50, 50),
  //   new Form(40, 3, 120)
  // ))

  let xMin = -500;
  let xMax = 500;
  let yMin = -500;
  let yMax = 500;
  let rMax = 50;
  let rMin = 25;
  let maxVertecies = 12;

  for(let i = 0; i < 66; i++) {  
    let start = new Vector2(Math.floor(Math.random()*(xMax-xMin)) - Math.abs(xMin), Math.floor(Math.random()*(yMax-yMin)) - Math.abs(yMin));
    let form = new ConvexIrregular(Math.floor(Math.random()*(rMax-rMin)) + rMin, Math.ceil(Math.random()*(maxVertecies-2)) + 2, .5, Math.floor( Math.random()*360));
    // let form = new Form(Math.floor(Math.random()*(rMax-rMin)) + rMin, Math.ceil(Math.random()*(maxVertecies-2)) + 2, Math.floor( Math.random()*360));
    let worldobj = new FromObject(start, form);
    s.addObject(worldobj);
  }

  s.start();
  // s.tick();
}
import Canvas from "../../../../templates/display/Canvas.js"
import System from "../../../../templates/System.js";
import Vector2 from "../../../../templates/util/Vector2.js";
import Polygon from "../../../../templates/physic/2d/boundingBox/Polygon.js";
import Formeln from "../../../../templates/Formeln.js";
import WorldObject from "../../../../templates/assets/WorldObject.js";
import MoveableObject from "../../../../templates/assets/MovableObject.js";

window.onload = () => {
  let canvas = document.getElementById("scene");
  let c = new Canvas(canvas);

  let s = new System(c);

  let first = true;

  for(let i = 0; i < 2; i++) {  
    let xMin = -50;
    let xMax = 50;
    let yMin = -50;
    let yMax = 50;
    let rMax = 50;
    let rMin = 25;
    let maxVertecies = 5;
    let start = new Vector2(Math.floor(Math.random()*(xMax-xMin)) - (xMin), Math.floor(Math.random()*(yMax-yMin)) - (yMin));
    let form = new Polygon(start, Math.floor(Math.random()*(rMax-rMin)) + rMin, Math.ceil(Math.random()*(maxVertecies-2)) + 2);
    let worldobj = new MoveableObject(start, form);
    s.addObject(worldobj);
    if(!first) {
      worldobj.bLockMovement = true;
    } else {first = false;}
  }

  s.start();
}
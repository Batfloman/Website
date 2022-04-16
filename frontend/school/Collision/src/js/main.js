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
import UIObject from "../../../../templates/assets/UIObject.js";
import Input from "../../../../templates/input/Input.js";

let s;
let selected = new Array();

window.onload = () => {
  let canvas = document.getElementById("scene");
  let c = new Canvas(canvas);
  c.lockMovement = false;

  s = new System(c);

  if (!s.isMobile) {
    s.addObject(
      new UIObject(
        new Vector2(100, 50),
        new Rectangle(180, 30),
        "clear",
        () => {
          updateSelected();
          let arr = selected.length == 0 ? s.findObjects(FromObject) : selected;
          arr.forEach(form => {
            s.removeObject(form);
          })
        }
      )
    )

    s.addObject(
      new UIObject(
        new Vector2(100, 100),
        new Rectangle(180, 30),
        "new Random",
        () => {
          s.addObject(createRandomForm());
        }
      )
    )

    s.addObject(
      new UIObject(
        new Vector2(100, 150),
        new Rectangle(180, 30),
        "10x Random",
        () => {
          for (let i = 0; i < 10; i++) {
            s.addObject(createRandomForm());
          }
        }
      )
    )

    s.addObject(
      new UIObject(
        new Vector2(100, 200),
        new Rectangle(180, 30),
        "Stop!",
        () => {
          updateSelected();
          let arr = selected.length == 0 ? s.findObjects(FromObject) : selected;
          arr.forEach(form => {
            form.degPerSec = 0;
          })
        }
      )
    )

    s.addObject(
      new UIObject(
        new Vector2(100, 250),
        new Rectangle(180, 30),
        "random Speed",
        () => {
          updateSelected();
          let arr = selected.length == 0 ? s.findObjects(FromObject) : selected;
          arr.forEach(form => {
            form.degPerSec = FromObject.randomSpeed(30, 180);
          })
        }
      )
    )

    s.addObject(
      new UIObject(
        new Vector2(100, 300),
        new Rectangle(180, 30),
        "2 * Speed",
        () => {
          updateSelected();
          let arr = selected.length == 0 ? s.findObjects(FromObject) : selected;
          arr.forEach(form => {
            form.degPerSec *= 2;
          })
        }
      )
    )

    s.addObject(
      new UIObject(
        new Vector2(100, 350),
        new Rectangle(180, 30),
        "0.5 * Speed",
        () => {
          updateSelected();
          let arr = selected.length == 0 ? s.findObjects(FromObject) : selected;
          arr.forEach(form => {
            form.degPerSec *= 0.5;
          })
        }
      )
    )

    s.addObject(
      new UIObject(
        new Vector2(100, 400),
        new Rectangle(180, 30),
        "select all",
        () => {
          s.findObjects(FromObject).forEach(obj => {
            obj.lockMovement = false;
          })
        }
      )
    )

    s.addObject(
      new UIObject(
        new Vector2(100, 450),
        new Rectangle(180, 30),
        "unselect all",
        () => {
          s.findObjects(FromObject).forEach(obj => {
            obj.lockMovement = true;
          })
        }
      )
    )
  }

  for (let i = 0; i < 66; i++) {
    s.addObject(createRandomForm());
  }

  // s.addObject(
  //   new FromObject(
  //     new Vector2(0, 0),
  //     new Form(50, 4, 45)
  //   )
  // )

  s.start();
  // s.tick();
}

function createRandomForm() {
  let xMin = -500;
  let xMax = 500;
  let yMin = -500;
  let yMax = 500;
  let rMax = 50;
  let rMin = 25;
  let maxVertecies = 12;

  let start = new Vector2(Math.floor(Math.random() * (xMax - xMin)) - Math.abs(xMin), Math.floor(Math.random() * (yMax - yMin)) - Math.abs(yMin));
  let form = new ConvexIrregular(Math.floor(Math.random() * (rMax - rMin)) + rMin, Math.ceil(Math.random() * (maxVertecies - 2)) + 2, .5, Math.floor(Math.random() * 360));
  // let form = new Form(Math.floor(Math.random()*(rMax-rMin)) + rMin, Math.ceil(Math.random()*(maxVertecies-2)) + 2, Math.floor( Math.random()*360));
  let worldobj = new FromObject(start, form);
  return worldobj;
}

function updateSelected() {
  selected = new Array();
  s.findObjects(FromObject).forEach(obj => {
    if (!obj.lockMovement) selected.push(obj);
  })
}
import FromObject from "./FormObject";
import ConvexIrregular from "./ConvexIrregular";
import System from "../../templates/System";
import Canvas from "../../templates/display/Canvas";
import UIObject from "../../templates/assets/UIObject";
import Vector2 from "../../templates/util/Vector2";
import Rectangle from "../../templates/physic/2d/boundingBox/Rectangle";

let s: System;
let selected = new Array();

window.onload = () => {
  let c = new Canvas(document.querySelector("canvas"));
  c.lockScrolling = false;

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
          let objects = s.findObjects(FromObject) as FromObject[];
          objects.forEach(obj => {
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
          let objects = s.findObjects(FromObject) as FromObject[];
          objects.forEach(obj => {
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

function createRandomForm(): FromObject {
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

function updateSelected(): void {
  selected = new Array();
  
  let objects = s.findObjects(FromObject) as FromObject[];
  objects.forEach(obj => {
    if (!obj.lockMovement) selected.push(obj);
  })
}
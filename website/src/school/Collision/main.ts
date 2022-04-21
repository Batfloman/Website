import FormObject from "./FormObject.js";
import ConvexIrregular from "./ConvexIrregular.js";
import System from "../../templates/System.js";
import Canvas from "../../templates/display/Canvas.js";
import UIObject from "../../templates/2d/assets/UIObject.js";
import Vector2 from "../../templates/util/Vector2.js";
import Rectangle from "../../templates/2d/boundingBox/Rectangle.js";
import Form from "./Form.js";
import Polygon from "../../templates/2d/boundingBox/Polygon2.js";
import RandomForm from "./RandomForm.js";
import Util from "../../templates/util/Util.js";

let s: System;
let selected = new Array();

window.onload = () => {
  let c = new Canvas(document.querySelector("canvas"));

  s = new System(c);

  // if (!s.isMobile) {
  //   s.addObject(
  //     new UIObject(
  //       new Vector2(100, 50),
  //       new Rectangle(180, 30),
  //       "clear",
  //       () => {
  //         updateSelected();
  //         let arr = selected.length == 0 ? s.findObjects(FormObject) : selected;
  //         if (arr == null) return;
  //         arr.forEach(form => {
  //           s.removeObject(form);
  //         })
  //       }
  //     )
  //   )

  //   s.addObject(
  //     new UIObject(
  //       new Vector2(100, 100),
  //       new Rectangle(180, 30),
  //       "new Random",
  //       () => {
  //         s.addObject(createRandomForm());
  //       }
  //     )
  //   )

  //   s.addObject(
  //     new UIObject(
  //       new Vector2(100, 150),
  //       new Rectangle(180, 30),
  //       "10x Random",
  //       () => {
  //         for (let i = 0; i < 10; i++) {
  //           s.addObject(createRandomForm());
  //         }
  //       }
  //     )
  //   )

  //   s.addObject(
  //     new UIObject(
  //       new Vector2(100, 200),
  //       new Rectangle(180, 30),
  //       "Stop!",
  //       () => {
  //         updateSelected();
  //         let arr = selected.length == 0 ? s.findObjects(FormObject) : selected;
  //         if (arr == null) return;
  //         arr.forEach(form => {
  //           form.degPerSec = 0;
  //         })
  //       }
  //     )
  //   )

  //   s.addObject(
  //     new UIObject(
  //       new Vector2(100, 250),
  //       new Rectangle(180, 30),
  //       "random Speed",
  //       () => {
  //         updateSelected();
  //         let arr = selected.length == 0 ? s.findObjects(FormObject) : selected;
  //         if (arr == null) return;
  //         arr.forEach(form => {
  //           form.degPerSec = FormObject.randomSpeed(30, 180);
  //         })
  //       }
  //     )
  //   )

  //   s.addObject(
  //     new UIObject(
  //       new Vector2(100, 300),
  //       new Rectangle(180, 30),
  //       "2 * Speed",
  //       () => {
  //         updateSelected();
  //         let arr = selected.length == 0 ? s.findObjects(FormObject) : selected;
  //         if (arr == null) return;
  //         arr.forEach(form => {
  //           form.degPerSec *= 2;
  //         })
  //       }
  //     )
  //   )

  //   s.addObject(
  //     new UIObject(
  //       new Vector2(100, 350),
  //       new Rectangle(180, 30),
  //       "0.5 * Speed",
  //       () => {
  //         updateSelected();
  //         let arr = selected.length == 0 ? s.findObjects(FormObject) : selected;
  //         if (arr == null) return;
  //         arr.forEach(form => {
  //           form.degPerSec *= 0.5;
  //         })
  //       }
  //     )
  //   )

  //   s.addObject(
  //     new UIObject(
  //       new Vector2(100, 400),
  //       new Rectangle(180, 30),
  //       "select all",
  //       () => {
  //         let objects = s.findObjects(FormObject) as FormObject[];
  //         objects.forEach(obj => {
  //           obj.lockMovement = false;
  //         })
  //       }
  //     )
  //   )

  //   s.addObject(
  //     new UIObject(
  //       new Vector2(100, 450),
  //       new Rectangle(180, 30),
  //       "unselect all",
  //       () => {
  //         let objects = s.findObjects(FormObject) as FormObject[];
  //         objects.forEach(obj => {
  //           obj.lockMovement = true;
  //         })
  //       }
  //     )
  //   )
  // }

  // for (let i = 0; i < 66; i++) {
  //   s.addObject(createRandomForm());
  // }

  // s.addObject(
  //   new FormObject(
  //     new Vector2(-100, 100),
  //     new RandomForm(75, 4, 1, 0)
  //   )
  // )

  for (let i = 0; i < 66; i++) {
    s.addObject(createRandomForm())
  }

  // s.addObject(new FormObject(new Vector2(), new Polygon(
  //   [
  //     new Vector2(0, -100),
  //     new Vector2(45, 45),
  //     new Vector2(100, 0),
  //     new Vector2(100, 100),
  //     new Vector2(0, 100),
  //     new Vector2(-25, -25),
  //     new Vector2(-50, 25),
  //     new Vector2(-75, -50)
  //   ]
  // )))

  s.start();
  // s.tick();
}

function createConvexIrregular(): FormObject {
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
  let worldobj = new FormObject(start, form);
  return worldobj;
}

function createRandomForm(): FormObject {
  let startX = Util.randomBetween(-500, 500);
  let startY = Util.randomBetween(-500, 500);
  let start = new Vector2(startX, startY);

  let radius = Util.randomBetween(25, 50);
  let numVertices = Util.randomBetween(4, 25);
  let irregularity = Util.randomBetween(0.33, .99, 5);
  let startAngle = Util.randomBetween(0, 360);
  let form = new RandomForm(radius, numVertices, irregularity, startAngle);

  let worldobj = new FormObject(start, form);
  return worldobj;
}

function updateSelected(): void {
  selected = new Array();

  let objects = s.findObjects(FormObject) as FormObject[];
  objects.forEach(obj => {
    if (!obj.lockMovement) selected.push(obj);
  })
}
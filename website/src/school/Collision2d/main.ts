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

  if (!s.isMobile) {
    s.addObject(
      new UIObject(
        new Vector2(100, 50),
        new Rectangle(180, 30),
        "clear",
        () => {
          updateSelected();
          let arr = selected.length == 0 ? s.findObjects(FormObject) : selected;
          if (arr == null) return;
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
          s.addObject(createRandomFormObject());
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
            s.addObject(createRandomFormObject());
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
          let arr = selected.length == 0 ? s.findObjects(FormObject) : selected;
          if (arr == null) return;
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
          let arr = selected.length == 0 ? s.findObjects(FormObject) : selected;
          if (arr == null) return;
          arr.forEach(form => {
            form.degPerSec = FormObject.randomSpeed(30, 180);
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
          let arr = selected.length == 0 ? s.findObjects(FormObject) : selected;
          if (arr == null) return;
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
          let arr = selected.length == 0 ? s.findObjects(FormObject) : selected;
          if (arr == null) return;
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
          let objects = s.findObjects(FormObject) as FormObject[];
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
          let objects = s.findObjects(FormObject) as FormObject[];
          objects.forEach(obj => {
            obj.lockMovement = true;
          })
        }
      )
    )
  }

  // s.addObject(
  //   new FormObject(
  //     new Vector2(-100, 100),
  //     new RandomForm(75, 4, 1, 0)
  //   )
  // )

  // for (let i = 0; i < 66; i++) {
  //     s.addObject(createConvexIrregular());
  // }

  for (let i = 0; i < 40; i++) {
    s.addObject(createRandomFormObject())
  }

  // s.addObject(new FormObject(new Vector2(), createForm()));
  // s.addObject(new FormObject(new Vector2(-100, 0), createForm()));
  // s.addObject(new FormObject(new Vector2(100, 0), createForm()));

  // s.addObject(new FormObject(new Vector2(), createRandomForm()));
  // s.addObject(new FormObject(new Vector2(-100, 0), createRandomForm()));
  // s.addObject(new FormObject(new Vector2(100, 0), createRandomForm()));

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

  // s.addObject(new FormObject(new Vector2(125, -10), new Polygon(
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

  // ===============================================================================================================
  // facharbeit Bilder
  // ===============================================================================================================


  // let form1 = new FormObject(
  //   new Vector2(-120, 0),
  //   new Rectangle(150, 150)
  // )
  // form1.collisionColor = "magenta";
  // form1.standardColor = "magenta";
  // form1.zIndex = 0;
  // s.addObject(form1);

  // let form2 = new FormObject(
  //   new Vector2(100, -50),
  //   new Form(100, 3, 0)
  // )
  // form2.collisionColor = "rgb(115, 200, 250)";
  // form2.standardColor = "rgb(115, 200, 250)";
  // form2.zIndex = 5;
  // s.addObject(form2);

  // let line = new FormObject(
  //   new Vector2(0, 0),
  //   new Form(233, 2, 0)
  // )
  // line.standardColor = "red";
  // s.addObject(line);

  // let rightline = new FormObject(
  //   new Vector2(-100, 0),
  //   new Form(233, 2, 0)
  // )
  // rightline.standardColor = "blue";
  // rightline.collisionColor = "blue";
  // rightline.zIndex = 10;
  // s.addObject(rightline);

  // let sideLine = new FormObject(
  //   new Vector2(-100, -75),
  //   new Form(75, 2, 90)
  // )
  // sideLine.standardColor = "red";
  // sideLine.collisionColor = "red";
  // sideLine.standardWidth = 4;
  // sideLine.zIndex = 1;
  // s.addObject(sideLine);

  // form1.drawPoints = true;
  // form2.drawPoints = true;

  // let projektLine = new FormObject(
  //   new Vector2(0, -150),
  //   new Form(100, 2, 90)
  // )
  // projektLine.collisionColor = "grey";
  // projektLine.standardColor = "grey";
  // projektLine.standardWidth = 2;
  // projektLine.zIndex = 1;
  // s.addObject(projektLine);

  // let projektLine2 = new FormObject(
  //   new Vector2(45, 0),
  //   new Form(145, 2, 90)
  // )
  // projektLine2.collisionColor = "grey";
  // projektLine2.standardColor = "grey";
  // projektLine2.standardWidth = 2;
  // projektLine2.zIndex = 15;
  // s.addObject(projektLine2);

  // let projektLine3 = new FormObject(
  //   new Vector2(-100, -75),
  //   new Form(75, 2, 90)
  // )
  // projektLine3.collisionColor = "grey";
  // projektLine3.standardColor = "grey";
  // projektLine3.standardWidth = 2;
  // projektLine3.zIndex = 1;
  // s.addObject(projektLine3);

  // let projektLine4 = new FormObject(
  //   new Vector2(-100, 75),
  //   new Form(75, 2, 90)
  // )
  // projektLine4.collisionColor = "grey";
  // projektLine4.standardColor = "grey";
  // projektLine4.standardWidth = 2;
  // projektLine4.zIndex = 1;
  // s.addObject(projektLine4);

  // let projektLine = new FormObject(
  //   new Vector2(-80, -150),
  //   new Form(7, 2, 90)
  // )
  // projektLine.collisionColor = "grey";
  // projektLine.standardColor = "grey";
  // projektLine.standardWidth = 2.5;
  // projektLine.zIndex = 1;
  // s.addObject(projektLine);

  // let projektLine2 = new FormObject(
  //   new Vector2(-80, 0),
  //   new Form(7, 2, 90)
  // )
  // projektLine2.collisionColor = "grey";
  // projektLine2.standardColor = "grey";
  // projektLine2.standardWidth = 2.5;
  // projektLine2.zIndex = 15;
  // s.addObject(projektLine2);

  // let projektLine3 = new FormObject(
  //   new Vector2(-90, -75),
  //   new Form(7, 2, 90)
  // )
  // projektLine3.collisionColor = "grey";
  // projektLine3.standardColor = "grey";
  // projektLine3.standardWidth = 2.5;
  // projektLine3.zIndex = 1;
  // s.addObject(projektLine3);

  // let projektLine4 = new FormObject(
  //   new Vector2(-90, 75),
  //   new Form(7, 2, 90)
  // )
  // projektLine4.collisionColor = "grey";
  // projektLine4.standardColor = "grey";
  // projektLine4.standardWidth = 2.5;
  // projektLine4.zIndex = 1;
  // s.addObject(projektLine4);

  // let connectPoint1and2 = new FormObject(
  //   new Vector2(-80, -75),
  //   new Form(75, 2, 0)
  // )
  // connectPoint1and2.standardColor = "rgb(115, 200, 250)";
  // connectPoint1and2.collisionColor = "rgb(115, 200, 250)";
  // connectPoint1and2.standardWidth = 4;
  // connectPoint1and2.zIndex = 30;
  // s.addObject(connectPoint1and2);
  
  // let connectPoint3and4 = new FormObject(
  //   new Vector2(-90, 0),
  //   new Form(75, 2, 0)
  // )
  // connectPoint3and4.standardColor = "magenta";
  // connectPoint3and4.collisionColor = "magenta";
  // connectPoint3and4.standardWidth = 4;
  // connectPoint3and4.zIndex = 30;
  // s.addObject(connectPoint3and4);

  // let projektLine = new FormObject(
  //   new Vector2(-80, -210),
  //   new Form(7, 2, 90)
  // )
  // projektLine.collisionColor = "grey";
  // projektLine.standardColor = "grey";
  // projektLine.standardWidth = 2.5;
  // projektLine.zIndex = 1;
  // s.addObject(projektLine);

  // let projektLine2 = new FormObject(
  //   new Vector2(-80, -90),
  //   new Form(7, 2, 90)
  // )
  // projektLine2.collisionColor = "grey";
  // projektLine2.standardColor = "grey";
  // projektLine2.standardWidth = 2.5;
  // projektLine2.zIndex = 15;
  // s.addObject(projektLine2);

  // let projektLine3 = new FormObject(
  //   new Vector2(-90, -45),
  //   new Form(7, 2, 90)
  // )
  // projektLine3.collisionColor = "grey";
  // projektLine3.standardColor = "grey";
  // projektLine3.standardWidth = 2.5;
  // projektLine3.zIndex = 1;
  // s.addObject(projektLine3);

  // let projektLine4 = new FormObject(
  //   new Vector2(-90, 115),
  //   new Form(7, 2, 90)
  // )
  // projektLine4.collisionColor = "grey";
  // projektLine4.standardColor = "grey";
  // projektLine4.standardWidth = 2.5;
  // projektLine4.zIndex = 1;
  // s.addObject(projektLine4);

  // let connectPoint1and2 = new FormObject(
  //   new Vector2(-80, -150),
  //   new Form(60, 2, 0)
  // )
  // connectPoint1and2.standardColor = "rgb(115, 200, 250)";
  // connectPoint1and2.collisionColor = "rgb(115, 200, 250)";
  // connectPoint1and2.standardWidth = 4;
  // connectPoint1and2.zIndex = 30;
  // s.addObject(connectPoint1and2);
  
  // let connectPoint3and4 = new FormObject(
  //   new Vector2(-90, 35),
  //   new Form(80, 2, 0)
  // )
  // connectPoint3and4.standardColor = "magenta";
  // connectPoint3and4.collisionColor = "magenta";
  // connectPoint3and4.standardWidth = 4;
  // connectPoint3and4.zIndex = 30;
  // s.addObject(connectPoint3and4);


  // ========================================================================================================================
  //                    nicht convexe Formen 
  // ========================================================================================================================

  // let form1 = new FormObject(
  //   new Vector2(),
  //   new Polygon([
  //     new Vector2(0,0).scale(5),
  //     new Vector2(50, -75).scale(5),
  //     new Vector2(50, 15).scale(5),
  //     new Vector2(-15, 45).scale(5),
  //     new Vector2(-65, 10).scale(5),
  //     new Vector2(-55, -60).scale(5),
  //   ])
  // )
  // form1.standardColor = "magenta"
  // form1.drawPoints = true;
  // s.addObject(form1);

  // let form2 = new FormObject(
  //   new Vector2(-105, -110),
  //   new Polygon([
  //     new Vector2(0, -120),
  //     new Vector2(50, -90),
  //     new Vector2(150, 10),
  //     new Vector2(105, 90),
  //     new Vector2(85, -10),
  //     new Vector2(-10, 5),
  //     new Vector2(-25, -35)
  //   ])
  // )
  // form2.standardColor = "rgb(115, 200, 250)";
  // s.addObject(form2);


  s.start();
  // s.tick();
}

function createConvexIrregular(): FormObject {
  let startX = Util.randomBetween(-500, 500);
  let startY = Util.randomBetween(-500, 500);
  let start = new Vector2(startX, startY);
  
  let radius = Util.randomBetween(25, 50);
  let numVertices = Util.randomBetween(3, 12);
  let irregularity = Util.randomBetween(0.1, 0.5, 5);
  let startAngle = Util.randomBetween(0, 360);
  let form = new ConvexIrregular(radius, numVertices, irregularity, startAngle);
  // let form = new Form(radius, numVertices, startAngle);
  let worldobj = new FormObject(start, form);
  return worldobj;
}

function createRandomFormObject(): FormObject {
  let startX = Util.randomBetween(-500, 500);
  let startY = Util.randomBetween(-500, 500);
  let start = new Vector2(startX, startY);

  let radius = Util.randomBetween(25, 50);
  let numVertices = Util.randomBetween(6, 8);
  let irregularity = Util.randomBetween(0.33, .99, 5);
  let startAngle = Util.randomBetween(0, 360);
  let form = new RandomForm(radius, numVertices, irregularity, startAngle);

  let worldobj = new FormObject(start, form);
  return worldobj;
}

function createForm(): Polygon {
  let radius = Util.randomBetween(25, 50);
  let numVertices = Util.randomBetween(3, 9, 0);
  let form = new Form(radius, numVertices);

  return form;
}

function createRandomForm(): Polygon {
  let radius = Util.randomBetween(25, 50);
  let numVertices = Util.randomBetween(3, 9, 0);
  let irregularity = Util.randomBetween(0.33, .99, 5);
  let form = new RandomForm(radius, numVertices, irregularity);

  return form;
}

function updateSelected(): void {
  selected = new Array();

  let objects = s.findObjects(FormObject) as FormObject[];
  objects.forEach(obj => {
    if (!obj.lockMovement) selected.push(obj);
  })
}
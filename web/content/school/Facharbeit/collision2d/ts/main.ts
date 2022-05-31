import { Canvas } from "../../../../lib/display/Canvas.js";
import { FormObject } from "./FormObject.js";
import { System } from "./System.js";
import { Util } from "../../../../lib/util/Util.js";
import { Vector2 } from "../../../../lib/util/Vector2.js";
import { Form } from "./Form.js";
import { Color } from "../../../../lib/util/Color.js";
import { Polygon2 } from "../../../../lib/physic/boundingBox/Polygon2.js";
import { UISimpleButton } from "../../../../lib/assets/objects/ui/UISimpleButton.js";

// settings
const amountShapes = 750;
const fieldSize = 15000;

const minVertices = 4;
const maxVertices = 12;

const minRadius = 25;
const maxRadius = 75;

const minIrregularity = 1;
const maxIrregularity = 1;
// =========

window.onload = () => {
  let s = new System(new Canvas(document.querySelector("canvas")));

  s.setCamaraMovementLock(false);
  s.setCamaraScaleLock(false);
  s.setWorldChunkSize(500);

  s.getCamara().setMaxZoomOutAmount(12);

  // UI

  s.addObject(new UISimpleButton("center", 10, 4, "test"));

  // contents

  for (let i = 0; i < amountShapes; i++) {
    s.addObject(createRandomShape());
  }

  // let form = new FormObject(
  //   new Vector2(-100, 0),
  //   new Polygon2([
  //     new Vector2(0, 100),
  //     new Vector2(200, 120),
  //     new Vector2(10, 0),
  //     new Vector2(200, -120),
  //     new Vector2(0, -100),
  //     new Vector2(-100, 0),
  //   ]),
  //   0
  // );
  // form.rotationSpeed = 0;
  // s.addObject(form);

  // let form2 = new FormObject(
  //   new Vector2(100, 0),
  //   new Polygon2([
  //     new Vector2(0, 100),
  //     new Vector2(200, 120),
  //     new Vector2(10, 0),
  //     new Vector2(200, -120),
  //     new Vector2(0, -100),
  //     new Vector2(-100, 0),
  //   ])
  // )
  // form2.selected = true;
  // form2.rotationSpeed = 0;
  // s.addObject(form2);

  s.start();
  // s.tick();
};

function createRandomShape(): FormObject {
  let start = new Vector2(
    Util.math.random.between(-fieldSize / 2, fieldSize / 2, 2),
    Util.math.random.between(-fieldSize / 2, fieldSize / 2, 2)
  );
  let form = new Form(
    Util.math.random.between(minVertices, maxVertices),
    Util.math.random.between(minRadius, maxRadius, 2),
    Util.math.random.between(minIrregularity, maxIrregularity, 2)
  );
  form.centerModel();
  return new FormObject(start, form, Util.math.random.between(0, 360));
}

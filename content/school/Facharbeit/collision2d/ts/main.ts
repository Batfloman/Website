import { Canvas } from "../../../old/web/content/lib/display/Canvas.js";
import { FormObject, selectDistance } from "./src/FormObject.js";
import { System } from "./src/System.js";
import { Util } from "../../../old/web/content/lib/util/Util.js";
import { Vector2 } from "../../../old/web/content/lib/util/Vector2.js";
import { Form } from "./src/Form.js";
import { UISimpleButton } from "../../../old/web/content/lib/assets/objects/ui/UISimpleButton.js";
import { Input } from "../../../old/web/content/lib/input/Input.js";

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

var speedBefore = 0;

let s = new System(new Canvas(document.querySelector("canvas")));

// ==========================================================================================
// #region settings

s.setCamaraMovementLock(false);
s.setCamaraScaleLock(false);
s.setWorldChunkSize(500);

s.getCamara().setMaxZoomOutAmount(12);

//#endregion

// ==========================================================================================
// #region UI

// select Objects on click
Input.newEventListener("click", s, () => {
  const worldPos = Util.position.staticPos_to_worldPos(Input.mPos, s.getCamara());

  const world = s.getWorld();
  if (!world) return;

  const chunkPos = world.findChunkOfPos(worldPos);
  const chunk = world.getChunk(chunkPos.x, chunkPos.y);
  if (!chunk) return;
  const chunks = world.findNeighbourChunksOf(chunk);

  for (let chunk of chunks) {
    for (let obj of chunk.findObjects<FormObject>(FormObject)) {
      const distance = Util.distance(worldPos, obj.pos);

      if (distance <= selectDistance) {
        obj.selected = !obj.selected;
        return; // select only one at a time!
      }
    }
  }
});

// stop game
const stopButton = new UISimpleButton(new Vector2(7, 5), "10", "4", "Stop");
stopButton.action = () => {
  let temp = speedBefore;
  speedBefore = s.speedMult;
  s.speedMult = temp;
};
s.addObject(stopButton);

// speed up Object rotation
const speedUp = new UISimpleButton(new Vector2(7, 13), "10", "4", "Speed Up");
speedUp.action = () => {
  s.speedMult *= 1.25;
};
s.addObject(speedUp);

// slow down Object rotation
const slowDown = new UISimpleButton(new Vector2(7, 18), "10", "4", "Slow Down");
slowDown.action = () => {
  s.speedMult /= 1.25;
};
s.addObject(slowDown);

// reverse Object rotation
const reverseRotation = new UISimpleButton(new Vector2(7, 23), "10", "4", "reverse Rotation");
reverseRotation.action = () => {
  s.speedMult *= -1;
};
s.addObject(reverseRotation);

//#endregion

// ==========================================================================================
// #region contents

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

//#endregion

s.start();

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

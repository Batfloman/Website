"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Canvas_js_1 = require("../../../../lib/display/Canvas.js");
const FormObject_js_1 = require("./src/FormObject.js");
const System_js_1 = require("./src/System.js");
const Util_js_1 = require("../../../../lib/util/Util.js");
const Vector2_js_1 = require("../../../../lib/util/Vector2.js");
const Form_js_1 = require("./src/Form.js");
const UISimpleButton_js_1 = require("../../../../lib/assets/objects/ui/UISimpleButton.js");
const Input_js_1 = require("../../../../lib/input/Input.js");
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
let s = new System_js_1.System(new Canvas_js_1.Canvas(document.querySelector("canvas")));
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
Input_js_1.Input.newEventListener("click", s, () => {
    const worldPos = Util_js_1.Util.position.staticPos_to_worldPos(Input_js_1.Input.mPos, s.getCamara());
    const world = s.getWorld();
    if (!world)
        return;
    const chunkPos = world.findChunkOfPos(worldPos);
    const chunk = world.getChunk(chunkPos.x, chunkPos.y);
    if (!chunk)
        return;
    const chunks = world.findNeighbourChunksOf(chunk);
    for (let chunk of chunks) {
        for (let obj of chunk.findObjects(FormObject_js_1.FormObject)) {
            const distance = Util_js_1.Util.distance(worldPos, obj.pos);
            if (distance <= FormObject_js_1.selectDistance) {
                obj.selected = !obj.selected;
                return; // select only one at a time!
            }
        }
    }
});
// stop game
const stopButton = new UISimpleButton_js_1.UISimpleButton(new Vector2_js_1.Vector2(7, 5), "10", "4", "Stop");
stopButton.action = () => {
    let temp = speedBefore;
    speedBefore = s.speedMult;
    s.speedMult = temp;
};
s.addObject(stopButton);
// speed up Object rotation
const speedUp = new UISimpleButton_js_1.UISimpleButton(new Vector2_js_1.Vector2(7, 13), "10", "4", "Speed Up");
speedUp.action = () => {
    s.speedMult *= 1.25;
};
s.addObject(speedUp);
// slow down Object rotation
const slowDown = new UISimpleButton_js_1.UISimpleButton(new Vector2_js_1.Vector2(7, 18), "10", "4", "Slow Down");
slowDown.action = () => {
    s.speedMult /= 1.25;
};
s.addObject(slowDown);
// reverse Object rotation
const reverseRotation = new UISimpleButton_js_1.UISimpleButton(new Vector2_js_1.Vector2(7, 23), "10", "4", "reverse Rotation");
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
function createRandomShape() {
    let start = new Vector2_js_1.Vector2(Util_js_1.Util.math.random.between(-fieldSize / 2, fieldSize / 2, 2), Util_js_1.Util.math.random.between(-fieldSize / 2, fieldSize / 2, 2));
    let form = new Form_js_1.Form(Util_js_1.Util.math.random.between(minVertices, maxVertices), Util_js_1.Util.math.random.between(minRadius, maxRadius, 2), Util_js_1.Util.math.random.between(minIrregularity, maxIrregularity, 2));
    form.centerModel();
    return new FormObject_js_1.FormObject(start, form, Util_js_1.Util.math.random.between(0, 360));
}

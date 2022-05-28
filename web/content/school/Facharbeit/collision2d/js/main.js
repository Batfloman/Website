import Canvas from "../../../../lib/display/Canvas.js";
import FormObject from "./FormObject.js";
import System from "./System.js";
import Util from "../../../../lib/util/Util.js";
import Vector2 from "../../../../lib/util/Vector2.js";
import Form from "./Form.js";
const amountShapes = 750;
const fieldSize = 15000;
const minVertices = 4;
const maxVertices = 12;
const minRadius = 25;
const maxRadius = 75;
const minIrregularity = 1;
const maxIrregularity = 1;
window.onload = () => {
    let s = new System(new Canvas(document.querySelector("canvas")));
    s.setCamaraMovementLock(false);
    s.setCamaraScaleLock(false);
    s.setWorldChunkSize(500);
    s.getCamara().setMaxZoomOutAmount(12);
    for (let i = 0; i < amountShapes; i++) {
        s.addObject(createRandomShape());
    }
    s.start();
};
function createRandomShape() {
    let start = new Vector2(Util.math.random.between(-fieldSize / 2, fieldSize / 2, 2), Util.math.random.between(-fieldSize / 2, fieldSize / 2, 2));
    let form = new Form(Util.math.random.between(minVertices, maxVertices), Util.math.random.between(minRadius, maxRadius, 2), Util.math.random.between(minIrregularity, maxIrregularity, 2));
    form.centerModel();
    return new FormObject(start, form, Util.math.random.between(0, 360));
}

import Canvas from "../../../../lib/display/Canvas.js";
import FormObject from "./FormObject.js";
import System from "./System.js";
import Util from "../../../../lib/util/Util.js";
import Vector2 from "../../../../lib/util/Vector2.js";
import Form from "./Form.js";
window.onload = () => {
    let s = new System(new Canvas(document.querySelector("canvas")));
    s.setCamaraMovementLock(false);
    s.setCamaraScaleLock(false);
    s.setWorldChunkSize(500);
    for (let i = 0; i < 500; i++) {
        s.addObject(createRandomShape());
    }
    s.start();
};
function createRandomShape() {
    let start = new Vector2(Util.math.random.between(-5000, 5000, 2), Util.math.random.between(-5000, 5000, 2));
    let form = new Form(Util.math.random.between(4, 15), Util.math.random.between(25, 75, 2), Util.math.random.between(1, 1, 2));
    form.centerModel();
    return new FormObject(start, form, Util.math.random.between(0, 360));
}

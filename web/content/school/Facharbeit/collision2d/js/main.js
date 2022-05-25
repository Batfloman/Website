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
    s.setMaxUpdateDistance(2000);
    for (let i = 0; i < 500; i++) {
        s.addObject(createRandomShape());
    }
    s.start();
};
function createRandomShape() {
    let start = new Vector2(Util.math.randomBetween(-5000, 5000, 2), Util.math.randomBetween(-5000, 5000, 2));
    let form = new Form(Util.math.randomBetween(4, 15), Util.math.randomBetween(25, 75, 2), Util.math.randomBetween(1, 1, 2));
    form.centerModel();
    return new FormObject(start, form, Util.math.randomBetween(0, 360));
}

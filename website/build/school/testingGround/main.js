import Canvas from "../../templates/display/Canvas.js";
import Cuboid from "../../templates/3d/boundingBox/Cuboid.js";
import System from "../../templates/System.js";
import Vector3 from "../../templates/util/Vector3.js";
import FormObject2 from "./FormObject2.js";
import TestForm from "./TestForm.js";
window.onload = () => {
    let s = new System(new Canvas(document.querySelector("canvas")));
    s.addObject(new FormObject2(new Vector3(), new TestForm(1000, 200)));
    s.start();
};
function randomCuboid() {
    return new FormObject2(new Vector3(((Math.random() * 250) - 125), ((Math.random() * 250) - 125), ((Math.random() * 250) - 125)), new Cuboid(((Math.random() * 100) + 10), ((Math.random() * 100) + 10), ((Math.random() * 100) + 10), new Vector3(0, 0, 0)));
}

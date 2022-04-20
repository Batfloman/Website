import FormObject from "./FormObject.js";
import ConvexIrregular from "./ConvexIrregular.js";
import System from "../../templates/System.js";
import Canvas from "../../templates/display/Canvas.js";
import Vector2 from "../../templates/util/Vector2.js";
let s;
let selected = new Array();
window.onload = () => {
    let c = new Canvas(document.querySelector("canvas"));
    s = new System(c);
    s.start();
};
function createRandomForm() {
    let xMin = -500;
    let xMax = 500;
    let yMin = -500;
    let yMax = 500;
    let rMax = 50;
    let rMin = 25;
    let maxVertecies = 12;
    let start = new Vector2(Math.floor(Math.random() * (xMax - xMin)) - Math.abs(xMin), Math.floor(Math.random() * (yMax - yMin)) - Math.abs(yMin));
    let form = new ConvexIrregular(Math.floor(Math.random() * (rMax - rMin)) + rMin, Math.ceil(Math.random() * (maxVertecies - 2)) + 2, .5, Math.floor(Math.random() * 360));
    let worldobj = new FormObject(start, form);
    return worldobj;
}
function updateSelected() {
    selected = new Array();
    let objects = s.findObjects(FormObject);
    objects.forEach(obj => {
        if (!obj.lockMovement)
            selected.push(obj);
    });
}

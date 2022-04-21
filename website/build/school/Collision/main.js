import FormObject from "./FormObject.js";
import ConvexIrregular from "./ConvexIrregular.js";
import System from "../../templates/System.js";
import Canvas from "../../templates/display/Canvas.js";
import Vector2 from "../../templates/util/Vector2.js";
import RandomForm from "./RandomForm.js";
import Util from "../../templates/util/Util.js";
let s;
let selected = new Array();
window.onload = () => {
    let c = new Canvas(document.querySelector("canvas"));
    s = new System(c);
    for (let i = 0; i < 66; i++) {
        s.addObject(createRandomForm());
    }
    s.start();
};
function createConvexIrregular() {
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
function createRandomForm() {
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
function updateSelected() {
    selected = new Array();
    let objects = s.findObjects(FormObject);
    objects.forEach(obj => {
        if (!obj.lockMovement)
            selected.push(obj);
    });
}

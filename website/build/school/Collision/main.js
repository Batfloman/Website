import FormObject from "./FormObject.js";
import ConvexIrregular from "./ConvexIrregular.js";
import System from "../../templates/System.js";
import Canvas from "../../templates/display/Canvas.js";
import UIObject from "../../templates/2d/assets/UIObject.js";
import Vector2 from "../../templates/util/Vector2.js";
import Rectangle from "../../templates/2d/boundingBox/Rectangle.js";
import RandomForm from "./RandomForm.js";
import Util from "../../templates/util/Util.js";
let s;
let selected = new Array();
window.onload = () => {
    let c = new Canvas(document.querySelector("canvas"));
    s = new System(c);
    if (!s.isMobile) {
        s.addObject(new UIObject(new Vector2(100, 50), new Rectangle(180, 30), "clear", () => {
            updateSelected();
            let arr = selected.length == 0 ? s.findObjects(FormObject) : selected;
            if (arr == null)
                return;
            arr.forEach(form => {
                s.removeObject(form);
            });
        }));
        s.addObject(new UIObject(new Vector2(100, 100), new Rectangle(180, 30), "new Random", () => {
            s.addObject(createRandomForm());
        }));
        s.addObject(new UIObject(new Vector2(100, 150), new Rectangle(180, 30), "10x Random", () => {
            for (let i = 0; i < 10; i++) {
                s.addObject(createRandomForm());
            }
        }));
        s.addObject(new UIObject(new Vector2(100, 200), new Rectangle(180, 30), "Stop!", () => {
            updateSelected();
            let arr = selected.length == 0 ? s.findObjects(FormObject) : selected;
            if (arr == null)
                return;
            arr.forEach(form => {
                form.degPerSec = 0;
            });
        }));
        s.addObject(new UIObject(new Vector2(100, 250), new Rectangle(180, 30), "random Speed", () => {
            updateSelected();
            let arr = selected.length == 0 ? s.findObjects(FormObject) : selected;
            if (arr == null)
                return;
            arr.forEach(form => {
                form.degPerSec = FormObject.randomSpeed(30, 180);
            });
        }));
        s.addObject(new UIObject(new Vector2(100, 300), new Rectangle(180, 30), "2 * Speed", () => {
            updateSelected();
            let arr = selected.length == 0 ? s.findObjects(FormObject) : selected;
            if (arr == null)
                return;
            arr.forEach(form => {
                form.degPerSec *= 2;
            });
        }));
        s.addObject(new UIObject(new Vector2(100, 350), new Rectangle(180, 30), "0.5 * Speed", () => {
            updateSelected();
            let arr = selected.length == 0 ? s.findObjects(FormObject) : selected;
            if (arr == null)
                return;
            arr.forEach(form => {
                form.degPerSec *= 0.5;
            });
        }));
        s.addObject(new UIObject(new Vector2(100, 400), new Rectangle(180, 30), "select all", () => {
            let objects = s.findObjects(FormObject);
            objects.forEach(obj => {
                obj.lockMovement = false;
            });
        }));
        s.addObject(new UIObject(new Vector2(100, 450), new Rectangle(180, 30), "unselect all", () => {
            let objects = s.findObjects(FormObject);
            objects.forEach(obj => {
                obj.lockMovement = true;
            });
        }));
    }
    for (let i = 0; i < 50; i++) {
        s.addObject(createRandomForm());
    }
    s.start();
};
function createConvexIrregular() {
    let startX = Util.randomBetween(-500, 500);
    let startY = Util.randomBetween(-500, 500);
    let start = new Vector2(startX, startY);
    let radius = Util.randomBetween(25, 50);
    let numVertices = Util.randomBetween(3, 12);
    let irregularity = Util.randomBetween(0.1, 0.5, 5);
    let startAngle = Util.randomBetween(0, 360);
    let form = new ConvexIrregular(radius, numVertices, irregularity, startAngle);
    let worldobj = new FormObject(start, form);
    return worldobj;
}
function createRandomForm() {
    let startX = Util.randomBetween(-500, 500);
    let startY = Util.randomBetween(-500, 500);
    let start = new Vector2(startX, startY);
    let radius = Util.randomBetween(25, 50);
    let numVertices = Util.randomBetween(6, 6);
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

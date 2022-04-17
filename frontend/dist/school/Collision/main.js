"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FormObject_1 = __importDefault(require("./FormObject"));
const ConvexIrregular_1 = __importDefault(require("./ConvexIrregular"));
const System_1 = __importDefault(require("../../templates/System"));
const Canvas_1 = __importDefault(require("../../templates/display/Canvas"));
const UIObject_1 = __importDefault(require("../../templates/assets/UIObject"));
const Vector2_1 = __importDefault(require("../../templates/util/Vector2"));
const Rectangle_1 = __importDefault(require("../../templates/physic/2d/boundingBox/Rectangle"));
let s;
let selected = new Array();
window.onload = () => {
    let c = new Canvas_1.default(document.querySelector("canvas"));
    c.lockScrolling = false;
    s = new System_1.default(c);
    if (!s.isMobile) {
        s.addObject(new UIObject_1.default(new Vector2_1.default(100, 50), new Rectangle_1.default(180, 30), "clear", () => {
            updateSelected();
            let arr = selected.length == 0 ? s.findObjects(FormObject_1.default) : selected;
            arr.forEach(form => {
                s.removeObject(form);
            });
        }));
        s.addObject(new UIObject_1.default(new Vector2_1.default(100, 100), new Rectangle_1.default(180, 30), "new Random", () => {
            s.addObject(createRandomForm());
        }));
        s.addObject(new UIObject_1.default(new Vector2_1.default(100, 150), new Rectangle_1.default(180, 30), "10x Random", () => {
            for (let i = 0; i < 10; i++) {
                s.addObject(createRandomForm());
            }
        }));
        s.addObject(new UIObject_1.default(new Vector2_1.default(100, 200), new Rectangle_1.default(180, 30), "Stop!", () => {
            updateSelected();
            let arr = selected.length == 0 ? s.findObjects(FormObject_1.default) : selected;
            arr.forEach(form => {
                form.degPerSec = 0;
            });
        }));
        s.addObject(new UIObject_1.default(new Vector2_1.default(100, 250), new Rectangle_1.default(180, 30), "random Speed", () => {
            updateSelected();
            let arr = selected.length == 0 ? s.findObjects(FormObject_1.default) : selected;
            arr.forEach(form => {
                form.degPerSec = FormObject_1.default.randomSpeed(30, 180);
            });
        }));
        s.addObject(new UIObject_1.default(new Vector2_1.default(100, 300), new Rectangle_1.default(180, 30), "2 * Speed", () => {
            updateSelected();
            let arr = selected.length == 0 ? s.findObjects(FormObject_1.default) : selected;
            arr.forEach(form => {
                form.degPerSec *= 2;
            });
        }));
        s.addObject(new UIObject_1.default(new Vector2_1.default(100, 350), new Rectangle_1.default(180, 30), "0.5 * Speed", () => {
            updateSelected();
            let arr = selected.length == 0 ? s.findObjects(FormObject_1.default) : selected;
            arr.forEach(form => {
                form.degPerSec *= 0.5;
            });
        }));
        s.addObject(new UIObject_1.default(new Vector2_1.default(100, 400), new Rectangle_1.default(180, 30), "select all", () => {
            s.findObjects(FormObject_1.default).forEach(obj => {
                obj.lockMovement = false;
            });
        }));
        s.addObject(new UIObject_1.default(new Vector2_1.default(100, 450), new Rectangle_1.default(180, 30), "unselect all", () => {
            s.findObjects(FormObject_1.default).forEach(obj => {
                obj.lockMovement = true;
            });
        }));
    }
    for (let i = 0; i < 66; i++) {
        s.addObject(createRandomForm());
    }
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
    let start = new Vector2_1.default(Math.floor(Math.random() * (xMax - xMin)) - Math.abs(xMin), Math.floor(Math.random() * (yMax - yMin)) - Math.abs(yMin));
    let form = new ConvexIrregular_1.default(Math.floor(Math.random() * (rMax - rMin)) + rMin, Math.ceil(Math.random() * (maxVertecies - 2)) + 2, .5, Math.floor(Math.random() * 360));
    let worldobj = new FormObject_1.default(start, form);
    return worldobj;
}
function updateSelected() {
    selected = new Array();
    s.findObjects(FormObject_1.default).forEach(obj => {
        if (!obj.lockMovement)
            selected.push(obj);
    });
}

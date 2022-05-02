import Vector2 from "../util/Vector2.js";
export default class Input {
    static staticConstructor() {
        window.addEventListener("touchstart", (event) => {
            Input.keyDown("0");
        });
        window.addEventListener("touchend", (event) => {
            Input.keyUp("0");
        });
        window.addEventListener("touchcancel", (event) => {
            this.pressedKeys = new Array();
        });
        window.addEventListener("mousedown", (event) => {
            Input.keyDown("" + event.button);
            Input.mPosHover = new Vector2(event.offsetX, event.offsetY);
        });
        window.addEventListener("mouseup", (event) => {
            Input.keyUp("" + event.button);
        });
        window.addEventListener("mousemove", (event) => {
            Input.mPosHover = new Vector2(event.offsetX, event.offsetY);
        });
        window.addEventListener("keydown", (event) => {
            Input.keyDown(event.key);
        });
        window.addEventListener("keyup", (event) => {
            Input.keyUp(event.key);
        });
        window.addEventListener("blur", () => {
            this.pressedKeys = new Array();
        });
    }
    static newEventListener(event, obj, func) {
        if (!Input.eventListener.has(event))
            window.addEventListener(event, Input.notifyOfEvent);
        let listener = Input.eventListener.get(event);
        if (!listener)
            listener = new Array();
        listener.push(new Listener(obj, func));
        Input.eventListener.set(event, listener);
    }
    static notifyOfEvent(event) {
        let listener = Input.eventListener.get(event.type);
        if (!listener)
            return;
        if (event instanceof MouseEvent)
            Input.mPosHover = new Vector2(event.offsetX, event.offsetY);
        listener.forEach((listener) => {
            listener.func.call(listener.obj, event);
        });
    }
    static keyDown(key) {
        key = key.toLowerCase();
        if (!this.pressedKeys.includes(key))
            this.pressedKeys.push(key);
    }
    static keyUp(key) {
        key = key.toLowerCase();
        if (this.pressedKeys.includes(key)) {
            let index = this.pressedKeys.indexOf(key);
            this.pressedKeys.splice(index, 1);
        }
    }
    static isLeftClick() {
        return Input.pressedKeys.includes("0");
    }
    static isPressed(key) {
        return Input.pressedKeys.includes(key.toLowerCase());
    }
}
Input.eventListener = new Map();
Input.pressedKeys = new Array();
Input.mPosHover = new Vector2();
class Listener {
    constructor(obj, func) {
        this.obj = obj;
        this.func = func;
    }
}
Input.staticConstructor();

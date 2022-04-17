import Vector2 from "../util/Vector2.js";
import Listener from "./Listener.js";
export default class Input {
    static staticConstructor() {
        ["touchend", "mouseup", "touchcancel"].forEach(inputEvent => {
            window.addEventListener(inputEvent, (event) => { Input.mouseDown = false; });
        });
        window.addEventListener("touchstart", (event) => { Input.mouseDown = true; });
        window.addEventListener("mousedown", (event) => {
            Input.updateMousePos(event);
            Input.mouseDown = true;
        });
        window.addEventListener("mousemove", Input.updateMousePos);
        window.addEventListener("keydown", (event) => {
            if (!(this.pressedKeys.includes(event.key)))
                this.pressedKeys.push(event.key.toLowerCase());
        });
        window.addEventListener("keyup", (event) => {
            if (this.pressedKeys.includes(event.key.toLowerCase())) {
                let index = this.pressedKeys.indexOf(event.key);
                this.pressedKeys.splice(index, 1);
            }
        });
        window.addEventListener("blur", () => {
            this.pressedKeys = new Array();
        });
    }
    static updateMousePos(event) {
        Input.mousePosPage = new Vector2(event.pageX, event.pageY);
        Input.mousePosScreen = new Vector2(event.screenX, event.screenY);
        Input.mousePosOffSet = new Vector2(event.offsetX, event.offsetY);
        Input.mouseMovement = new Vector2(event.movementX, event.movementY);
    }
    static newEventListener(event, obj, func) {
        if (!(Input.eventListener.has(event)))
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
        listener.forEach(listener => {
            listener.func.call(listener.obj, event);
        });
    }
    static getPressedKeys() {
        return this.pressedKeys;
    }
    static getMousePosPage() { return Input.mousePosPage; }
    static getMousePosScreen() { return Input.mousePosScreen; }
    static getMousePosOffSet() { return Input.mousePosOffSet; }
    static getMouseMovement() { return Input.mouseMovement; }
}
Input.eventListener = new Map();
Input.mouseDown = false;
Input.mousePosPage = new Vector2(0, 0);
Input.mousePosScreen = new Vector2(0, 0);
Input.mousePosOffSet = new Vector2(0, 0);
Input.mouseMovement = new Vector2(0, 0);
Input.pressedKeys = new Array();
Input.staticConstructor();

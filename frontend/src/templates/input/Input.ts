import SceneObject from "../assets/SceneObject";
import Vector2 from "../util/Vector2";
import Listener from "./Listener";

export default class Input {

  /** @type {Map} */
  static eventListener: Map<string, Listener[]> = new Map();

  // ===== mouse click =====
  
  /** @type {boolean} */
  static mouseDown = false;
  
  // ===== mouse move =====

  /** @type {Vector2} - mousePos on global document with scroll */
  static mousePosPage = new Vector2(0, 0);
  /** @type {Vector2} - mousePos relative to current Screen*/
  static mousePosScreen = new Vector2(0, 0);
  /** @type {Vector2} - mousePos relative to hovered element*/
  static mousePosOffSet = new Vector2(0, 0);
  /** @type {Vector2} - mousePos change (to last mousemove call)*/
  static mouseMovement = new Vector2(0, 0);

  // ===== pressed keys =====

  static pressedKeys = new Array();

  /**
   * updates the most important changes for easier access
   */
  static staticConstructor() {
    ["touchend", "mouseup", "touchcancel"].forEach(inputEvent => {
      window.addEventListener(inputEvent, (event) => { Input.mouseDown = false;})
    })
    window.addEventListener("touchstart", (event) => { Input.mouseDown = true;})
    window.addEventListener("mousedown", (event) => {
      Input.updateMousePos(event);
      Input.mouseDown = true;
    });
    window.addEventListener("mousemove", Input.updateMousePos);
    window.addEventListener("keydown", (event) => {
      if(!(this.pressedKeys.includes(event.key))) this.pressedKeys.push(event.key.toLowerCase()); 
    });
    window.addEventListener("keyup", (event) => {
      if(this.pressedKeys.includes(event.key.toLowerCase())) {
        let index = this.pressedKeys.indexOf(event.key);
        this.pressedKeys.splice(index, 1);
      }
    })
    window.addEventListener("blur", () => {
      this.pressedKeys = new Array();
    })
  }

  static updateMousePos(event: MouseEvent) {
    Input.mousePosPage = new Vector2(event.pageX, event.pageY);
    Input.mousePosScreen = new Vector2(event.screenX, event.screenY);
    Input.mousePosOffSet = new Vector2(event.offsetX, event.offsetY);
    Input.mouseMovement = new Vector2(event.movementX, event.movementY);
  }

  /**
   * 
   * @param {WindowEventMap} event 
   * @param {SceneObject} obj 
   * @param {Function} func
   */
  static newEventListener(event: string, obj: Object,  func: Function) {
    if(!(Input.eventListener.has(event))) window.addEventListener(event, Input.notifyOfEvent);

    let listener = Input.eventListener.get(event);
    if(!listener) listener = new Array();

    listener.push(new Listener(obj, func));
    Input.eventListener.set(event, listener);
  }

  static notifyOfEvent(event: Event) {
    let listener = Input.eventListener.get(event.type);
    if(!listener) return;

    listener.forEach(listener => {
      listener.func.call(listener.obj, event);
    });
  }

  static getPressedKeys() {
    return this.pressedKeys;
  }

  static getMousePosPage() { return Input.mousePosPage;}
  static getMousePosScreen() { return Input.mousePosScreen;}
  static getMousePosOffSet() { return Input.mousePosOffSet;}
  static getMouseMovement() { return Input.mouseMovement;}
}

// call static Constructor
Input.staticConstructor();
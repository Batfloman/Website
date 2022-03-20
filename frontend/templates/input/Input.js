import SceneObject from "../assets/SceneObject.js";
import Vector2 from "../util/Vector2.js";

export default class Input {


  /** @type {Map} */
  static eventListener = new Map();

  // ===== mouse click =====
  
  /** @type {boolean} */
  static mouseDown = false;
  
  // ===== mouse move =====

  /** @type {Vector2} - mousePos on global document with scroll */
  static mousePosPage = new Vector2();
  /** @type {Vector2} - mousePos relative to current Screen*/
  static mousePosScreen = new Vector2();
  /** @type {Vector2} - mousePos relative to hovered element*/
  static mousePosOffSet = new Vector2();
  /** @type {Vector2} - mousePos change (to last mousemove call)*/
  static mouseMovement = new Vector2();

  // ===== pressed keys =====

  static pressedKeys = new Array();

  /**
   * updates the most important changes for easier access
   */
  static staticConstructor() {
    window.addEventListener("mousemove", (event) => {
      Input.mousePosPage = new Vector2(event.pageX, event.pageY);
      Input.mousePosScreen = new Vector2(event.screenX, event.screenY);
      Input.mousePosOffSet = new Vector2(event.offsetX, event.offsetY);
      Input.mouseMovement = new Vector2(event.movementX, event.movementY);
    })
    window.addEventListener("keydown", (event) => {
      if(!(this.pressedKeys.includes(event.key))) this.pressedKeys.push(event.key.toLowerCase()); 
    })
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

  /**
   * 
   * @param {WindowEventMap} event 
   * @param {SceneObject} obj 
   */
  static newEventListener(event, obj) {
    if(!event) throw new Error(`${event} is no valid Event`);
    if(!obj) throw new Error(`${obj} is no valid Object`)

    let listener = new Array();
    if(Input.eventListener != undefined && Input.eventListener.has(event)) {
      listener = Input.eventListener.get(event);
    } else {
      window.addEventListener(event, Input.event);
    }
    listener.push(obj);
    Input.eventListener.set(event, listener);
  }

  static event(event) {
    Input.eventListener.get(event.type).forEach(obj => {
      obj.notify(event);
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
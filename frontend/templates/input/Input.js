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
  static mousePosPage;
  /** @type {Vector2} - mousePos relative to current Screen*/
  static mousePosScreen;
  /** @type {Vector2} - mousePos relative to hovered element*/
  static mousePosOffSet;
  /** @type {Vector2} - mousePos change (to last mousemove call)*/
  static mouseMovement;


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

  static getMousePosPage() { return Input.mousePosPage;}
  static getMousePosScreen() { return Input.mousePosScreen;}
  static getMousePosOffSet() { return Input.mousePosOffSet;}
  static getMouseMovement() { return Input.mouseMovement;}
}

// call static Constructor
Input.staticConstructor();
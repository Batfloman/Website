import { SceneObject } from "../assets/SceneObject.js";
import Vector2 from "../util/Vector2.js";
import Listener from "./Listener.js";

export default class Input {

  static eventListener: Map<string, Listener[]> = new Map();

  static pressedKeys: string[] = new Array();

  static mPosHover = new Vector2();

  /**
   * updates the most important changes for easier access
   */
  static staticConstructor() {
    
    // Touch
    window.addEventListener("touchstart", (event: TouchEvent) => {
      Input.keyDown("0");
    })
    window.addEventListener("touchend", (event: TouchEvent) => {
      Input.keyUp("0");
    })
    window.addEventListener("touchcancel", (event: TouchEvent) => {
      this.pressedKeys = new Array();
    })

    // Mouse 
    window.addEventListener("mousedown", (event: MouseEvent) => {
      Input.keyDown("" + event.button);
      Input.mPosHover = new Vector2(event.offsetX, event.offsetY);
    })
    window.addEventListener("mouseup", (event: MouseEvent) => {
      Input.keyUp("" + event.button);
    })
    window.addEventListener("mousemove", (event: MouseEvent) => {
      Input.mPosHover = new Vector2(event.offsetX, event.offsetY);
    })
    
    // Keys
    window.addEventListener("keydown", (event: KeyboardEvent) => {
      Input.keyDown(event.key); 
    });
    window.addEventListener("keyup", (event: KeyboardEvent) => {
      Input.keyUp(event.key);
    })

    // Window changes
    window.addEventListener("blur", () => {
      this.pressedKeys = new Array();
    })
  }

  static newEventListener<K extends keyof WindowEventMap>(event: K, obj: Object,  func: Function) {
    if(!(Input.eventListener.has(event))) window.addEventListener(event, Input.notifyOfEvent);

    let listener = Input.eventListener.get(event);
    if(!listener) listener = new Array();

    listener.push(new Listener(obj, func));
    Input.eventListener.set(event, listener);
  }

  static notifyOfEvent(event: Event) {
    let listener = Input.eventListener.get(event.type);
    if(!listener) return;

    if(event instanceof MouseEvent) Input.mPosHover = new Vector2(event.offsetX, event.offsetY);

    listener.forEach(listener => {
      listener.func.call(listener.obj, event);
    });
  }

  static keyDown(key: string) {
    key = key.toLowerCase();
    if(!(this.pressedKeys.includes(key))) this.pressedKeys.push(key); 
  }

  static keyUp(key: string) {
    key = key.toLowerCase();

    if(this.pressedKeys.includes(key)) {
      let index = this.pressedKeys.indexOf(key);
      this.pressedKeys.splice(index, 1);
    }
  }

  static isLeftClick(): boolean {
    return Input.pressedKeys.includes("0");
  }

  static isPressed(key: string): boolean {
    return Input.pressedKeys.includes(key.toLowerCase());
  } 
}

// call static Constructor
Input.staticConstructor();
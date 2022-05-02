import Canvas from "../../../../lib/display/Canvas.js.js";
import System from "../../../../lib/System.js.js";

window.onload = () => {
  let canvas = document.getElementById("game-screen");

  let c = new Canvas(canvas);
  let s = new System(c);

  

  // s.start();
  // s.tick();
}
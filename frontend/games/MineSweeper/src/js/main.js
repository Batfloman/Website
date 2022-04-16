import Canvas from "../../../../templates/display/Canvas.js";
import System from "../../../../templates/System.js";

window.onload = () => {
  let canvas = document.getElementById("game-screen");

  let c = new Canvas(canvas);
  let s = new System(c);

  

  // s.start();
  // s.tick();
}
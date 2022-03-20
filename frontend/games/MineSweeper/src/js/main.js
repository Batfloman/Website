import Canvas from "../../../../templates/display/Canvas";
import System from "../../../../templates/System";

window.onload = () => {
  let canvas = document.getElementById("game-screen");

  let c = new Canvas(canvas);

  let s = new System(c);
}
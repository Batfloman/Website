import Canvas from "../../templates/display/Canvas.js"
import System from "../../templates/System.js";
import Util from "../../templates/util/Util.js"

window.onload = () => {
  const canvas = new Canvas(document.querySelector("canvas"));

  const s = new System(canvas);
}
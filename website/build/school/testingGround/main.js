import Canvas from "../../templates/display/Canvas.js";
import System from "../../templates/System.js";
window.onload = () => {
    let s = new System(new Canvas(document.querySelector("canvas")));
    console.log(s);
};

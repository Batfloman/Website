import WorldObject from "../../templates/assets/WorldObject.js";
import Canvas from "../../templates/display/Canvas.js";
import Polygon from "../../templates/physic/2d/boundingBox/Polygon.js";
import System from "../../templates/System.js";
import Vector2 from "../../templates/util/Vector2.js";
var s;
window.onload = () => {
    s = new System(new Canvas(document.querySelector("canvas")));
    s.addObject(new WorldObject(new Vector2(), new Polygon([new Vector2()])));
    s.addObject(new WorldObject(new Vector2(), new Polygon([new Vector2()])));
    loop();
};
function loop() {
    window.requestAnimationFrame(loop);
}

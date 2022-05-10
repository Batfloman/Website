import Canvas from "../../../lib/display/Canvas.js";
import Vector2 from "../../../lib/util/Vector2.js";
import SkyBody from "./SkyBody.js";
import Universe from "./Universe.js";
import Util from "../../../lib/util/Util.js";
const maxDistance = 25000;
window.onload = () => {
    const universe = new Universe(new Canvas(document.querySelector("canvas")));
    universe.setCamaraMovementLock(false);
    universe.setCamaraScaleLock(false);
    universe.setMaxRenderDistance(maxDistance);
    universe.start();
};
function createSkyBody() {
    const pos = new Vector2(Util.randomBetween(-maxDistance / 2, maxDistance / 2), Util.randomBetween(-maxDistance / 2, maxDistance / 2));
    const random = Util.randomBetween(50, 250);
    return new SkyBody(pos, random, Math.pow(random, 1.5));
}

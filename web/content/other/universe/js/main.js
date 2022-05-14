import Canvas from "../../../lib/display/Canvas.js";
import Vector2 from "../../../lib/util/Vector2.js";
import SkyBody from "./SkyBody.js";
import Universe from "./Universe.js";
import Util from "../../../lib/util/Util.js";
const maxDistance = 100000;
const spawnAmount = Math.pow(maxDistance, 1 / 4) * Math.pow(maxDistance, 1 / 4);
window.onload = () => {
    const universe = new Universe(new Canvas(document.querySelector("canvas")));
    universe.setCamaraMovementLock(false);
    universe.setCamaraScaleLock(false);
    universe.setMaxUpdateDistance(Infinity);
    for (let i = 0; i < spawnAmount; i++) {
        universe.addObject(createSkyBody());
    }
    universe.start();
};
function createSkyBody() {
    const pos = new Vector2(Util.math.randomBetween(-maxDistance / 2, maxDistance / 2), Util.math.randomBetween(-maxDistance / 2, maxDistance / 2));
    const mass = Util.math.randomBetween(500, 50000);
    const velocity = new Vector2(Util.math.randomBetween(10, 150, 2) * Util.math.postiveOrNegative(), Util.math.randomBetween(10, 150, 2) * Util.math.postiveOrNegative());
    return new SkyBody(pos, mass, velocity);
}

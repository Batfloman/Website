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
    universe.setMaxUpdateDistance(maxDistance);
    for (let i = 0; i < 500; i++) {
        universe.addObject(createSkyBody());
    }
    universe.start();
    setInterval(() => {
        universe.findObjects(SkyBody).forEach((obj) => {
            if (Util.distance(universe.getCamara().pos, obj.pos) > universe.maxUpdateDistance)
                universe.removeObject(obj);
        });
        for (let i = 0; i < 125; i++) {
            universe.addObject(createSkyBody());
        }
    }, 5000);
};
function createSkyBody() {
    const pos = new Vector2(Util.math.randomBetween(-maxDistance / 2, maxDistance / 2), Util.math.randomBetween(-maxDistance / 2, maxDistance / 2));
    const random = Util.math.randomBetween(50, 250);
    return new SkyBody(pos, random, Math.pow(random, 1.5));
}

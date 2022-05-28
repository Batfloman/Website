import Canvas from "../../../lib/display/Canvas.js";
import Vector2 from "../../../lib/util/Vector2.js";
import SkyBody from "./SkyBody.js";
import Universe from "./Universe.js";
import Util from "../../../lib/util/Util.js";
const maxDistance = 250000;
const spawnAmount = Util.math.round.round(Math.pow(maxDistance, 1 / 4) * Math.pow(maxDistance, 1 / 4), 0);
window.onload = () => {
    const universe = new Universe(new Canvas(document.querySelector("canvas")));
    universe.setCamaraMovementLock(false);
    universe.setCamaraScaleLock(false);
    universe.setMaxUpdateDistance(500000);
    universe.setMaxDeleteDistance(250000);
    universe.setWorldChunkSize(1000);
    universe.getCamara().setScale(-25);
    for (let i = 0; i < spawnAmount; i++) {
        universe.addObject(createSkyBody());
    }
    universe.start();
    setInterval(() => {
        universe.findObjects(SkyBody).forEach((obj) => {
            if (Util.distance(universe.getCamara().pos, obj.pos) > universe.maxUpdateDistance)
                universe.removeObject(obj);
        });
        for (let i = 0; i < spawnAmount / 3; i++) {
            universe.addObject(createSkyBody());
        }
    }, 30000);
};
function createSkyBody() {
    const pos = new Vector2(Util.math.random.between(-maxDistance / 2, maxDistance / 2), Util.math.random.between(-maxDistance / 2, maxDistance / 2));
    const mass = Util.math.random.between(500, 50000);
    const velocity = new Vector2(Util.math.random.between(10, 150, 2) * Util.math.random.mathSign(), Util.math.random.between(10, 150, 2) * Util.math.random.mathSign());
    return new SkyBody(pos, mass, velocity);
}

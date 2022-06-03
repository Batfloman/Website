import { Canvas } from "../../../lib/display/Canvas.js";
import { Vector2 } from "../../../lib/util/Vector2.js";
import { SkyBody } from "./SkyBody.js";
import { Universe } from "./Universe.js";
import { Util } from "../../../lib/util/Util.js";
const maxDistance = 1000000;
const spawnAmount = 10000;
window.onload = () => {
    const universe = new Universe(new Canvas(document.querySelector("canvas")));
    universe.setCamaraMovementLock(false);
    universe.setCamaraScaleLock(false);
    universe.setWorldChunkSize(500);
    universe.getCamara().setScale(-25);
    for (let i = 0; i < spawnAmount; i++) {
        universe.addObject(createSkyBody());
    }
    universe.start();
};
function createSkyBody() {
    const pos = new Vector2(Util.math.random.between(-maxDistance / 2, maxDistance / 2), Util.math.random.between(-maxDistance / 2, maxDistance / 2));
    const mass = Util.math.random.between(500, 50000);
    const velocity = new Vector2(Util.math.random.between(100, 500, 2) * Util.math.random.mathSign(), Util.math.random.between(100, 500, 2) * Util.math.random.mathSign());
    return new SkyBody(pos, mass, velocity);
}

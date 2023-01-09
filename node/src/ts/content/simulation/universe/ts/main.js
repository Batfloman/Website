"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Canvas_js_1 = require("../../../lib/display/Canvas.js");
const Vector2_js_1 = require("../../../lib/util/Vector2.js");
const SkyBody_js_1 = require("./SkyBody.js");
const Universe_js_1 = require("./Universe.js");
const Util_js_1 = require("../../../lib/util/Util.js");
const maxDistance = 1000000;
const spawnAmount = 10000;
window.onload = () => {
    const universe = new Universe_js_1.Universe(new Canvas_js_1.Canvas(document.querySelector("canvas")));
    universe.setCamaraMovementLock(false);
    universe.setCamaraScaleLock(false);
    universe.setWorldChunkSize(500);
    universe.getCamara().setScale(-25);
    for (let i = 0; i < spawnAmount; i++) {
        universe.addObject(createSkyBody());
    }
    // universe.addObject(new SkyBody(new Vector2(-1000, 0), 10000, new Vector2(100, 0)))
    // universe.addObject(new SkyBody(new Vector2(1000, 0), 10000, new Vector2(-100, 0)))
    // universe.addObject(new SkyBody(new Vector2(), 10000));
    // universe.addObject(new SkyBody(new Vector2(1500, 0), 500, new Vector2(0, 50)));
    // universe.addObject(new SkyBody(new Vector2(2250, 0), 500, new Vector2(0, 75)));
    // universe.addObject(new SkyBody(new Vector2(3000, 0), 500, new Vector2(0, 100)));
    // universe.addObject(new SkyBody(new Vector2(5000, 0), 1000, new Vector2(0, 100)));
    universe.start();
};
function createSkyBody() {
    const pos = new Vector2_js_1.Vector2(Util_js_1.Util.math.random.between(-maxDistance / 2, maxDistance / 2), Util_js_1.Util.math.random.between(-maxDistance / 2, maxDistance / 2));
    const mass = Util_js_1.Util.math.random.between(500, 50000);
    const velocity = new Vector2_js_1.Vector2(Util_js_1.Util.math.random.between(100, 500, 2) * Util_js_1.Util.math.random.mathSign(), Util_js_1.Util.math.random.between(100, 500, 2) * Util_js_1.Util.math.random.mathSign());
    return new SkyBody_js_1.SkyBody(pos, mass, velocity);
}

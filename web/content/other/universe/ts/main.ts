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

  // universe.addObject(new SkyBody(new Vector2(-1000, 0), 10000, new Vector2(100, 0)))
  // universe.addObject(new SkyBody(new Vector2(1000, 0), 10000, new Vector2(-100, 0)))

  // universe.addObject(new SkyBody(new Vector2(), 10000));
  // universe.addObject(new SkyBody(new Vector2(1500, 0), 500, new Vector2(0, 50)));
  // universe.addObject(new SkyBody(new Vector2(2250, 0), 500, new Vector2(0, 75)));
  // universe.addObject(new SkyBody(new Vector2(3000, 0), 500, new Vector2(0, 100)));
  // universe.addObject(new SkyBody(new Vector2(5000, 0), 1000, new Vector2(0, 100)));

  universe.start();

  // setInterval(() => {
  //   (universe.findObjects(SkyBody) as SkyBody[]).forEach((obj) => {
  //     if (Util.distance(universe.getCamara().pos, obj.pos) > universe.maxUpdateDistance)
  //       universe.removeObject(obj);
  //   });
  //   for (let i = 0; i < spawnAmount / 3; i++) {
  //     universe.addObject(createSkyBody());
  //   }
  // }, 15000);
};

function createSkyBody() {
  const pos = new Vector2(
    Util.math.randomBetween(-maxDistance / 2, maxDistance / 2),
    Util.math.randomBetween(-maxDistance / 2, maxDistance / 2)
  );
  const mass = Util.math.randomBetween(500, 50000);
  const velocity = new Vector2(
    Util.math.randomBetween(10, 150, 2) * Util.math.postiveOrNegative(),
    Util.math.randomBetween(10, 150, 2) * Util.math.postiveOrNegative()
  );
  return new SkyBody(pos, mass, velocity);
}

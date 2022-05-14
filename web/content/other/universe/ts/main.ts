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

  // universe.addObject(new SkyBody(new Vector2(), 500, 10000));
  // universe.addObject(new SkyBody(new Vector2(1500, 0), 100, 500, new Vector2(0, 15)));
  // universe.addObject(new SkyBody(new Vector2(2250, 0), 150, 500, new Vector2(0, 20)));
  // universe.addObject(new SkyBody(new Vector2(3000, 0), 125, 500, new Vector2(0, 25)));
  // universe.addObject(new SkyBody(new Vector2(5000, 0), 200, 1000, new Vector2(0, 15)));

  universe.start();

  setInterval(() => {
    (universe.findObjects(SkyBody) as SkyBody[]).forEach((obj) => {
      if (Util.distance(universe.getCamara().pos, obj.pos) > universe.maxUpdateDistance)
        universe.removeObject(obj);
    });
    for (let i = 0; i < 125; i++) {
      universe.addObject(createSkyBody());
    }
  }, 5000);
};

function createSkyBody() {
  const pos = new Vector2(
    Util.math.randomBetween(-maxDistance/2, maxDistance/2),
    Util.math.randomBetween(-maxDistance/2, maxDistance/2)
  );
  const random = Util.math.randomBetween(50, 250);
  return new SkyBody(pos, random, Math.pow(random, 1.5));
}

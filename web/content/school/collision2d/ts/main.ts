import Canvas from "../../../lib/display/Canvas.js";
import FormObject from "./FormObject.js";
import System from "./System.js";
import Util from "../../../lib/util/Util.js";
import Vector2 from "../../../lib/util/Vector2.js";
import Form from "./Form.js";
import Rectangle from "../../../lib/physic/boundingBox/Rectangel.js";
import Polygon2 from "../../../lib/physic/boundingBox/Polygon2.js";

window.onload = () => {
  let s = new System(new Canvas(document.querySelector("canvas")));

  s.setCamaraMovementLock(false);
  s.setCamaraScaleLock(false);

  // for(let i = 0; i < 20; i++) {
  //   s.addObject(createRandomShape());
  // }

  let form1 = new FormObject(new Vector2(), new Rectangle(150, 150));
  s.addObject(form1);
  let form2 = new FormObject(new Vector2(10, 10), new Rectangle(150, 150));
  form2.selected = true;
  s.addObject(form2);

  let form3 = new FormObject(
    new Vector2(),
    new Polygon2([
      new Vector2(0, 100),
      new Vector2(50, 10),
      new Vector2(-10, -60),
      new Vector2(-200, -10),
    ])
  )
  s.addObject(form3);

  let form4 = new FormObject(
    new Vector2(100, 100),
    new Polygon2([
      new Vector2(0, 100),
      new Vector2(50, 10),
      new Vector2(-10, -60),
      new Vector2(-200, -10),
      new Vector2(0, 10)
    ])
  )
  s.addObject(form4);

  // s.start();
  s.tick ();
};

function createRandomShape(): FormObject {
  return new FormObject(
    new Vector2(Util.randomBetween(-50, 50, 2), Util.randomBetween(-50, 50, 2)),
    new Form(
      Util.randomBetween(5, 5),
      // 1,
      Util.randomBetween(25, 75, 2),
      // 0,
      Util.randomBetween(0.5, 1, 2)
    )
  );
}

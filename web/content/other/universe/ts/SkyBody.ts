import { WorldObject } from "../../../lib/assets/WorldObject.js";
import Renderer from "../../../lib/display/Renderer.js";
import Vector2 from "../../../lib/util/Vector2.js";
import Circle from "../../../lib/physic/boundingBox/Circle.js";
import Universe from "./Universe.js";
import Util from "../../../lib/util/Util.js";
import { Color } from "../../../lib/util/Color.js";
import CircleCollision from "../../../lib/physic/algorithms/CircleCollision.js";

export default class SkyBody extends WorldObject<Circle> {
  mass: number;
  density!: number;
  volume!: number;

  velocity: Vector2;
  impuls!: Vector2;
  forces!: Vector2;

  constructor(pos: Vector2, radius: number, mass: number, veloctiy: Vector2 = new Vector2()) {
    super(pos, new Circle(radius));
    this.mass = mass;
    this.velocity = veloctiy;
  }

  update2(dt: number): void {
    if (!(this.game instanceof Universe)) return;

    const g = (this.game as Universe).getGConst();
    this.forces = new Vector2();

    let objects: SkyBody[] = this.game.findObjects(SkyBody, this);

    objects.forEach((obj) => {
      if (this.checkCollision(obj)) {
        const bigger = this.mass > obj.mass ? this : obj;
        const smaller = bigger == this ? obj : this;

        bigger.mass += smaller.mass;
        this.game.removeObject(smaller);
      }
    });

    // update Values
    this.volume = this.getVolume();
    this.hitBox.farthestDistance = this.getRadius();

    // objects.forEach((obj) => {
    //   const force = (g * this.mass * obj.mass) / Math.pow(Util.distance(this.pos, obj.pos), 2);

    //   const distance = obj.pos.subtract(this.pos);
    //   const unitVec = new Vector2(
    //     distance.x / distance.getMagnitude(),
    //     distance.y / distance.getMagnitude()
    //   );
    //   this.forces = this.forces.add(unitVec.scale(force));
    // });

    this.velocity = this.velocity.add(
      new Vector2((dt * this.forces.x) / this.mass, (dt * this.forces.y) / this.mass)
    );

    this.move(this.velocity.scale(0.05));
  }
  render(renderer: Renderer): void {
    renderer.setFillColor(Color.get("yellow"));
    renderer.renderCircle(this.pos, this.getRadius());
  }

  translatePoints(): Vector2[] {
    return [this.pos];
  }

  // ==========================================================================================
  // physics

  private getVolume(): number {
    return this.mass / this.density;
  }

  private getMass(): number {
    return this.volume * this.density;
  }

  private getDensity(): number {
    return this.mass / this.volume;
  }

  private getRadius(): number {
    return Math.sqrt(this.volume / Math.PI);
  }

  // private gForce(obj: SkyBody): Vector2 {}
}

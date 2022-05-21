import { WorldObject } from "../../../lib/assets/Objects/WorldObject.js";
import Renderer from "../../../lib/display/Renderer.js";
import Vector2 from "../../../lib/util/Vector2.js";
import Circle from "../../../lib/physic/boundingBox/Circle.js";
import Universe from "./Universe.js";
import Util from "../../../lib/util/Util.js";
import { Color } from "../../../lib/util/Color.js";

export default class SkyBody extends WorldObject<Circle> {
  mass: number;
  density: number = 0.1;
  volume!: number;

  velocity: Vector2;
  impulse!: Vector2;
  forces!: Vector2;

  constructor(pos: Vector2, mass: number, veloctiy: Vector2 = new Vector2()) {
    super(pos, new Circle(0));
    this.mass = mass;
    this.velocity = veloctiy;

    this.updateValues();
  }

  updateValues(): void {
    const radius = this.getRadius();
    this.volume = this.getVolume();
    this.hitBox.radius = radius;
    this.hitBox.farthestDistance = 0.6666 * radius;
    this.impulse = this.getImpulse();
  }

  update2(dt: number): void {
    if (!(this.game instanceof Universe)) return;

    // update Values
    this.updateValues();

    const g = (this.game as Universe).getGConst();
    this.forces = new Vector2();

    let objects: SkyBody[] = this.game.findObjects(SkyBody, this);

    objects.forEach((obj) => {
      if (this.isCollidingWith(obj)) {
        const bigger = this.mass >= obj.mass ? this : obj;
        const smaller = bigger == this ? obj : this;

        const imp = bigger.getImpulse().add(smaller.getImpulse());
        bigger.mass += smaller.mass;
        this.velocity = this.getVelocityFromImpule(imp);
        
        this.game.removeObject(smaller);
      }
    });

    objects.forEach((obj) => {
      const force = (g * this.mass * obj.mass) / Math.pow(Util.distance(this.pos, obj.pos), 2);

      const distance = obj.pos.subtract(this.pos);
      const unitVec = new Vector2(
        distance.x / distance.getMagnitude(),
        distance.y / distance.getMagnitude()
      );
      this.forces = this.forces.add(unitVec.scale(force));
    });

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
    if (!this.volume) this.volume = this.getVolume();
    return Math.sqrt(this.volume / Math.PI);
  }

  private getImpulse(): Vector2 {
    return new Vector2(
      this.mass * this.velocity.x,
      this.mass * this.velocity.y
    )
  }

  private getVelocityFromImpule(impulse: Vector2) {
    return new Vector2(
      impulse.x / this.mass,
      impulse.y / this.mass
    )
  }

  // private gForce(obj: SkyBody): Vector2 {}
}

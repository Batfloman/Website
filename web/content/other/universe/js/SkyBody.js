import { WorldObject } from "../../../lib/assets/WorldObject.js";
import Vector2 from "../../../lib/util/Vector2.js";
import Circle from "../../../lib/physic/boundingBox/Circle.js";
import Universe from "./Universe.js";
import Util from "../../../lib/util/Util.js";
import { Color } from "../../../lib/util/Color.js";
import CircleCollision from "../../../lib/physic/algorithms/CircleCollision.js";
export default class SkyBody extends WorldObject {
    constructor(pos, radius, mass, veloctiy = new Vector2()) {
        super(pos, new Circle(radius));
        this.mass = mass;
        this.velocity = veloctiy;
    }
    update2(dt) {
        if (!(this.game instanceof Universe))
            return;
        const g = this.game.getGConst();
        this.forces = new Vector2();
        let objects = this.game.findObjects(SkyBody, this);
        objects.forEach((obj) => {
            const collision = CircleCollision.circleCollision(this.pos, this.hitBox.farthestPoint.getMagnitude(), obj.pos, obj.hitBox.farthestPoint.getMagnitude());
            if (collision) {
                const bigger = this.mass > obj.mass ? this : obj;
                const smaller = bigger == this ? obj : this;
                bigger.mass += smaller.mass;
                this.game.removeObject(smaller);
            }
        });
        objects.forEach((obj) => {
            const force = (g * this.mass * obj.mass) / Math.pow(Util.distance(this.pos, obj.pos), 2);
            const distance = obj.pos.subtract(this.pos).scale(1000);
            const unitVec = new Vector2(distance.x / distance.getMagnitude(), distance.y / distance.getMagnitude());
            this.forces = this.forces.add(unitVec.scale(force));
        });
        this.velocity = this.velocity.add(new Vector2((dt * this.forces.x) / this.mass, (dt * this.forces.y) / this.mass));
        this.move(this.velocity.scale(.05));
    }
    render(renderer) {
        renderer.setFillColor(Color.get("yellow"));
        renderer.renderCircle(this.pos, this.mass / 100);
    }
    translatePoints() {
        return [this.pos];
    }
}

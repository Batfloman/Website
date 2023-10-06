"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkyBody = void 0;
const WorldObject_js_1 = require("../../../lib/assets/objects/WorldObject.js");
const Vector2_js_1 = require("../../../lib/util/Vector2.js");
const Circle_js_1 = require("../../../lib/physic/boundingBox/Circle.js");
const Universe_js_1 = require("./Universe.js");
const Util_js_1 = require("../../../lib/util/Util.js");
const Color_js_1 = require("../../../lib/util/Color.js");
class SkyBody extends WorldObject_js_1.WorldObject {
    constructor(pos, mass, veloctiy = new Vector2_js_1.Vector2()) {
        super(pos, new Circle_js_1.Circle(0));
        this.density = 0.1;
        this.mass = mass;
        this.velocity = veloctiy;
        this.updateValues();
    }
    updateValues() {
        const radius = this.getRadius();
        this.volume = this.getVolume();
        this.hitBox.radius = radius;
        this.hitBox.farthestDistance = 0.6666 * radius;
        this.impulse = this.getImpulse();
    }
    update(dt) {
        if (!(this.game instanceof Universe_js_1.Universe))
            return;
        // update Values
        this.updateValues();
        // let objects: SkyBody[] = this.game.findObjects(SkyBody, this);
        const objects = this.world.findObjectsInNeighbouringChunks(this.chunk, SkyBody, this, 2);
        for (let obj of objects) {
            if (!this.isCollidingWith(obj))
                continue;
            const bigger = this.mass >= obj.mass ? this : obj;
            const smaller = bigger == this ? obj : this;
            const imp = bigger.getImpulse().add(smaller.getImpulse());
            bigger.mass += smaller.mass;
            this.velocity = this.getVelocityFromImpule(imp);
            this.game.removeObject(smaller);
        }
        const g = this.game.getGConst();
        this.forces = new Vector2_js_1.Vector2();
        objects.forEach((obj) => {
            const force = (g * this.mass * obj.mass) / Math.pow(Util_js_1.Util.distance(this.pos, obj.pos), 2);
            const distance = obj.pos.subtract(this.pos);
            const unitVec = new Vector2_js_1.Vector2(distance.x / distance.getMagnitude(), distance.y / distance.getMagnitude());
            this.forces = this.forces.add(unitVec.scale(force));
        });
        this.velocity = this.velocity.add(new Vector2_js_1.Vector2((dt * this.forces.x) / this.mass, (dt * this.forces.y) / this.mass));
        this.move(this.velocity.scale(0.05));
    }
    render(renderer) {
        renderer.setFillColor(Color_js_1.Color.get("yellow"));
        renderer.renderCircle(this.pos, this.getRadius());
    }
    translatePoints() {
        return [this.pos];
    }
    // ==========================================================================================
    // physics
    getVolume() {
        return this.mass / this.density;
    }
    getMass() {
        return this.volume * this.density;
    }
    getDensity() {
        return this.mass / this.volume;
    }
    getRadius() {
        if (!this.volume)
            this.volume = this.getVolume();
        return Math.sqrt(this.volume / Math.PI);
    }
    getImpulse() {
        return new Vector2_js_1.Vector2(this.mass * this.velocity.x, this.mass * this.velocity.y);
    }
    getVelocityFromImpule(impulse) {
        return new Vector2_js_1.Vector2(impulse.x / this.mass, impulse.y / this.mass);
    }
}
exports.SkyBody = SkyBody;

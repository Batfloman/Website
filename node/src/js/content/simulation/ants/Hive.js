import { Ant } from "./Ant.js";
import * as THREE from "three";
import { Game } from "../../../myLib/system/Game.js";
import { settings } from "./main.js";
import { WorldObject } from "../../../myLib/objects/WorldObject.js";
import { Util } from "../../../myLib/util/Util.js";
export class Hive extends WorldObject {
    foodStored;
    timeSinceLastAntSpawn = 0;
    color;
    constructor(pos, foodStorage = 0, color = 0xffffff * Math.random()) {
        const geo = new THREE.CircleGeometry(settings.hive.size);
        const mat = new THREE.MeshBasicMaterial({ color });
        const mesh = new THREE.Mesh(geo, mat);
        super(mesh, pos);
        this.color = color;
        this.foodStored = foodStorage;
    }
    update(dt) {
        this.timeSinceLastAntSpawn += dt;
        if (this.timeSinceLastAntSpawn < settings.hive.spawnCooldown)
            return;
        if (this.foodStored < settings.hive.antCost)
            return;
        this.timeSinceLastAntSpawn = 0;
        this.foodStored -= settings.hive.antCost;
        this.spawnAnt();
    }
    addFood(amount) {
        this.foodStored += amount;
    }
    spawnAnt() {
        const ant = new Ant(this.pos, this.color);
        ant.rotateAboutZ(Util.math.random.between(0, 360));
        Game.instance.object.add(ant);
    }
    set = {
        foodStored: (num) => (this.foodStored = num),
    };
}

import { WorldObject } from "../../../../lib/assets/objects/WorldObject.js";
import { Circle } from "../../../../lib/physic/boundingBox/Circle.js";
import { Color } from "../../../../lib/util/Color.js";
import { Vector2 } from "../../../../lib/util/Vector2.js";
import { Ant } from "./Ant.js";
const antFoodCost = 250;
const saveFoodPerAnt = 0;
const hillSize = 50;
const timeBetweenAntSpawn = 250;
export class Hive extends WorldObject {
    constructor(pos = new Vector2(), foodStorage = 0) {
        super(pos, new Circle(hillSize));
        this.antCounter = 0;
        this.color = Color.getRandomNamedColor();
        this.lastAntSpawnTimeElapsed = 0;
        this.hiveId = Hive.hiveCounter++;
        this.food = foodStorage;
        this.zIndex = 100;
    }
    update(dt) {
        this.lastAntSpawnTimeElapsed += dt;
        if (this.lastAntSpawnTimeElapsed > timeBetweenAntSpawn) {
            if (this.food > this.antCounter * saveFoodPerAnt) {
                this.food -= antFoodCost;
                const ant = new Ant(this.pos);
                ant.setColor("searchFood", this.color);
                ant.setHiveId(this.hiveId);
                this.game.addObject(ant);
                this.antCounter++;
            }
            this.lastAntSpawnTimeElapsed = 0;
        }
    }
    render(renderer) {
        this.color.setA(100);
        renderer.setStrokeColor(this.color);
        renderer.setFillColor(this.color);
        renderer.renderCircle(this.pos, hillSize);
    }
}
Hive.hiveCounter = 0;

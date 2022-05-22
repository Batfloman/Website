import { WorldObject } from "../../../../lib/assets/Objects/WorldObject.js";
import Circle from "../../../../lib/physic/boundingBox/Circle.js";
import { Color } from "../../../../lib/util/Color.js";
import Vector2 from "../../../../lib/util/Vector2.js";
import Ant from "./Ant.js";
const antFoodCost = 25;
const saveFoodPerAnt = 100;
const hillSize = 50;
const timeBetweenAntSpawn = 250;
export default class AntHill extends WorldObject {
    constructor(pos = new Vector2(), foodStorage = 0) {
        super(pos, new Circle(hillSize));
        this.antCounter = 0;
        this.lastAntSpawnTimeElapsed = 0;
        this.food = foodStorage;
        this.zIndex = 100;
    }
    update2(dt) {
        this.lastAntSpawnTimeElapsed += dt;
        if (this.lastAntSpawnTimeElapsed > timeBetweenAntSpawn) {
            if (this.food > (this.antCounter * saveFoodPerAnt)) {
                this.food -= antFoodCost;
                this.game.addObject(new Ant(this.pos));
                this.antCounter++;
            }
            this.lastAntSpawnTimeElapsed = 0;
        }
    }
    render(renderer) {
        renderer.setStrokeColor(Color.get("brown"));
        renderer.setFillColor(Color.get("brown"));
        renderer.renderCircle(this.pos, hillSize);
    }
}

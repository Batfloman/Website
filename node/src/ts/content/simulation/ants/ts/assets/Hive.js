"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hive = void 0;
const WorldObject_js_1 = require("../../../../lib/assets/objects/WorldObject.js");
const Circle_js_1 = require("../../../../lib/physic/boundingBox/Circle.js");
const Color_js_1 = require("../../../../lib/util/Color.js");
const Vector2_js_1 = require("../../../../lib/util/Vector2.js");
const Ant_js_1 = require("./Ant.js");
const antFoodCost = 250;
const saveFoodPerAnt = 0;
const hillSize = 50;
const timeBetweenAntSpawn = 250;
class Hive extends WorldObject_js_1.WorldObject {
    constructor(pos = new Vector2_js_1.Vector2(), foodStorage = 0) {
        super(pos, new Circle_js_1.Circle(hillSize));
        this.antCounter = 0;
        this.color = Color_js_1.Color.getRandomNamedColor();
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
                const ant = new Ant_js_1.Ant(this.pos);
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
exports.Hive = Hive;
Hive.hiveCounter = 0;

import { WorldObject } from "../../../../lib/assets/objects/WorldObject.js";
import Renderer from "../../../../lib/display/Renderer.js";
import Circle from "../../../../lib/physic/boundingBox/Circle.js";
import { Color } from "../../../../lib/util/Color.js";
import Util from "../../../../lib/util/Util.js";
import Vector2 from "../../../../lib/util/Vector2.js";
import Ant from "./Ant.js";

const antFoodCost = 25;
const saveFoodPerAnt = 100;
const hillSize = 50;
const timeBetweenAntSpawn = 250;

export default class AntHill extends WorldObject<Circle> {
  food: number;
  antCounter = 0;

  constructor(pos: Vector2 = new Vector2(), foodStorage: number = 0) {
    super(pos, new Circle(hillSize));

    this.food = foodStorage;

    this.zIndex = 100;
  }

  lastAntSpawnTimeElapsed = 0;

  update2(dt: number): void {
    this.lastAntSpawnTimeElapsed += dt;

    if(this.lastAntSpawnTimeElapsed > timeBetweenAntSpawn) {
      if(this.food > (this.antCounter * saveFoodPerAnt)) {
        this.food -= antFoodCost;
        this.game.addObject(new Ant(this.pos));
        this.antCounter++;
      }
      this.lastAntSpawnTimeElapsed = 0;
    }
  }
  render(renderer: Renderer): void {
    renderer.setStrokeColor(Color.get("brown"));
    renderer.setFillColor(Color.get("brown"));
    renderer.renderCircle(this.pos, hillSize);
  }
}
import { WorldObject } from "../../../../lib/assets/objects/WorldObject.js";
import Renderer from "../../../../lib/display/Renderer.js";
import Circle from "../../../../lib/physic/boundingBox/Circle.js";
import { Color } from "../../../../lib/util/Color.js";
import Vector2 from "../../../../lib/util/Vector2.js";
import Ant from "./Ant.js";

const antFoodCost = 250;
const saveFoodPerAnt = 100;
const hillSize = 50;
const timeBetweenAntSpawn = 250;

export default class AntHill extends WorldObject<Circle> {
  food: number;
  antCounter = 0;

  color = Color.getRandomNamedColor();

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

        const ant = new Ant(this.pos);
        ant.setColor("searchFood", this.color);
        this.game.addObject(ant);
        this.antCounter++;
      }
      this.lastAntSpawnTimeElapsed = 0;
    }
  }
  render(renderer: Renderer): void {
    renderer.setStrokeColor(this.color);
    renderer.setFillColor(this.color);
    renderer.renderCircle(this.pos, hillSize);
  }
}
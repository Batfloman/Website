import { WorldObject } from "../../../../lib/assets/objects/WorldObject.js";
import Renderer from "../../../../lib/display/Renderer.js";
import Circle from "../../../../lib/physic/boundingBox/Circle.js";
import { Color } from "../../../../lib/util/Color.js";
import Util from "../../../../lib/util/Util.js";
import Vector2 from "../../../../lib/util/Vector2.js";
import AntHill from "./AntHill.js";
import Food from "./Food.js";
import Pheromon, { Message } from "./Pheromon.js";

type Task = "searchFood" | "bringFoodHome" | "runHome";

const taskColors = new Map<Task, Color>([
  ["searchFood", Color.get("white")],
  ["bringFoodHome", Color.get("green")],
  ["runHome", Color.get("yellow")],
]);

const antSize = 3.5;
const antOrientationChange = 5;
const timeBetweenPheromon = 75;

const maxFood = 100;
const foodLoss = 5;
const foodPercentageLeftRunsHome = 50;
const panicSpeedBoost = 1.5;

const sensoryDistance = 33;
const senseAngle = 65;

const carryAmount = 500;

const antSpeed = 50;

export default class Ant extends WorldObject<Circle> {
  task: Task = "searchFood";
  food: number;
  carry: number = 0;

  constructor(pos: Vector2 = new Vector2(), task: Task = "searchFood") {
    // super(pos, new Circle(antSize), Util.math.randomBetween(0, 360, 2));
    super(pos, new Circle(antSize), Util.math.randomBetween(0, 0, 2));

    this.zIndex = 50;
    this.food = maxFood;
    this.task = task;
  }

  timeElapsed: number = 0;
  timeElapsed2: number = 0;

  update2(dt: number): void {
    const homes = this.game.findObjects(AntHill) as Array<AntHill>;
    const foodStuffs = this.game.findObjects(Food) as Array<Food>;

    // set Direction to move fitting for task
    switchTask: switch (this.task) {
      case "runHome":
        // home in Range ?
        for (let home of homes) {
          const distance = Util.distance(this.pos, home.pos);
          const radius = home.hitBox.radius;

          if (distance < radius) {
            // eat
            const foodNeeded = maxFood - this.food;

            this.food += foodNeeded;
            // TODO remove Food from AntHill
            this.task = "searchFood";
            break switchTask;
          } else if (distance < radius + sensoryDistance) {
            // go strait to home
            this.orientation = Util.findAngleLine(this.pos, home.pos);
            break switchTask;
          }
        }

        // follow Pheromones to Home
        this.rotate(this.findRotation("home"));
        break;
      case "bringFoodHome":
        // Home in Range ?
        for (let home of homes) {
          const distance = Util.distance(this.pos, home.pos);
          const radius = home.hitBox.radius;

          if (distance < radius) {
            // eat
            const foodNeeded = maxFood - this.food;

            this.food += foodNeeded;
            // TODO remove Food from AntHill
          }

          // put food ?
          if (distance < radius / 2) {
            // put food in Anthill
            home.food += this.carry;
            this.carry = 0;
            this.task = "searchFood";
            this.orientation += Util.math.randomBetween(160, 200, 2); // turn around after food deposit
            break switchTask;
          } else if (distance < radius + sensoryDistance) {
            this.orientation = Util.findAngleLine(this.pos, home.pos);
            break switchTask;
          }
        }

        // follow Pheromones to Home
        this.rotate(this.findRotation("home"));
        break;
      case "searchFood":
        // Food in Range ?
        for (let food of foodStuffs) {
          const distance = Util.distance(this.pos, food.pos);
          const radius = food.hitBox.radius;

          if (distance < radius / 2) {
            // pick up Food
            food.amountFood -= carryAmount;
            this.carry = carryAmount;
            this.task = "bringFoodHome";
            this.orientation += Util.math.randomBetween(170, 180, 2); // turn around after food pickup
            break switchTask;
          } else if (distance < radius + sensoryDistance) {
            this.orientation = Util.findAngleLine(this.pos, food.pos);
            break switchTask;
          }
        }

        // follow Food Pheromons (if none are there => value = 0 => move Random)
        this.rotate(this.findRotation("food", false));
        break;
    }

    // add random Rotation (realism)
    this.orientation += this.randomRotation();

    // move
    // doubled when starving
    const moveSpeed = this.task == "runHome" ? antSpeed * panicSpeedBoost : antSpeed;
    this.moveDirection(this.orientation, this.calc_valueChangeForDT(moveSpeed, dt));

    // creates Pheromon every x ms;
    this.timeElapsed += dt;
    if (this.timeElapsed > timeBetweenPheromon) {
      this.timeElapsed = 0;
      this.createPheromon();
    }

    //
    this.timeElapsed2 += dt;
    if (this.timeElapsed2 > 1000) {
      this.timeElapsed2 -= 1000;

      this.food -= foodLoss;

      // should worry about food ?
      if (this.food <= (maxFood / 100) * foodPercentageLeftRunsHome && this.task == "searchFood") {
        if (this.carry > 0) {
          const foodEaten = Math.min(maxFood - this.food, this.carry);

          this.food += foodEaten;
          this.carry -= foodEaten;
          if (this.carry == 0) this.task = "searchFood";
        } else {
          this.task = "runHome";
          this.orientation += Util.math.randomBetween(170, 190, 2);
        }
      }
      // is Dead ?
      if (this.food <= 0) {
        this.game.removeObject(this);
      }
    }
  }
  render(renderer: Renderer): void {
    const color = taskColors.get(this.task);
    if (!color) return;

    renderer.setStrokeColor(color);
    renderer.setFillColor(color);
    renderer.renderCircle(this.pos, antSize);
  }

  createPheromon() {
    let message: Message;
    switch (this.task) {
      case "searchFood":
        message = "home";
        break;
      case "bringFoodHome":
        message = "food";
        break;
      case "runHome":
        // don't create Pheromon when dying! Saves energy or something
        return;
    }

    this.game.addObject(new Pheromon(this.pos, message));
  }

  private pheromonsFoundBefore: boolean = false;
  findRotation(pheromonType: Message, shouldTurnAround = true): number {
    let rotation = this.followPhermons(pheromonType);

    if (rotation == undefined) {
      let returnValue = this.pheromonsFoundBefore
        ? shouldTurnAround
          ? Util.math.randomBetween(160, 200, 2)
          : 0
        : 0;
      this.pheromonsFoundBefore = false;
      return returnValue;
    } else {
      this.pheromonsFoundBefore = true;
      return rotation;
    }
  }

  // Returns a rotation value to follow the pheromon type
  // undefined when no pheromons found
  followPhermons(message: Message): number | undefined {
    let sumWeightedAngles: number = 0;
    let sumWeights: number = 0;

    const chunks = this.world.findNeighbourChunksOf(this.chunk, 1);

    for (let chunk of chunks) {
      const pheromones = chunk.findObjects(Pheromon) as Array<Pheromon>;

      for (let pheromon of pheromones) {
        // right message ?
        if (pheromon.message != message) continue;

        const distance = Util.distance(this.pos, pheromon.pos);
        // right Distance ?
        if (distance > sensoryDistance) continue;

        // right Angle ?
        const vecToPheromon = pheromon.pos.subtract(this.pos);
        const moveVec = Util.toVector(this.orientation, 1);
        const angle = moveVec.angle(vecToPheromon);
        if (angle > senseAngle || angle < -senseAngle) continue;

        // everything right!

        const weight = this.weightPheromon(distance, pheromon.strength);

        sumWeightedAngles += angle * weight;
        sumWeights += weight;
      }
    }

    if (sumWeights == 0) return undefined;

    if (isNaN(sumWeightedAngles / sumWeights)) console.log(sumWeightedAngles, sumWeights);

    return sumWeightedAngles / sumWeights;
  }

  private weightPheromon(distance: number, strength: number): number {
    const distanceWeight = 2 * (1 - distance / sensoryDistance); // closer => to 1 | further => to 0
    const strengthWeight = this.weightStrength(strength); // older => to 1 | newer => to 0
    return distanceWeight * strengthWeight;
  }

  private weightStrength(strength: number): number {
    return -4 * Math.pow(1 - strength / 100 - 0.5, 2) + 1;
  }

  // Returns a random Rotation to match ant "behaviour"
  randomRotation(): number {
    return Util.math.randomBetween(-antOrientationChange, antOrientationChange, 2);
  }
}

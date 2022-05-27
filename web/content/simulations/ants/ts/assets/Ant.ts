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
const timeBetweenPheromon = 150;

const maxFood = 100;
const foodLoss = 3;
const foodPercentageLeftRunsHome = 50;
const panicSpeedBoost = 1.5;

const sensoryDistance = 33;
const senseAngle = 65;

const carryAmount = 150;

const antSpeed = 75;
const maxRotationAngle = 33;

export default class Ant extends WorldObject<Circle> {
  task: Task = "searchFood";
  food: number;
  carry: number = 0;

  constructor(pos: Vector2 = new Vector2(), task: Task = "searchFood") {
    super(pos, new Circle(antSize), Util.math.randomBetween(0, 360, 2));

    this.zIndex = 50;
    this.food = maxFood;
    this.task = task;
  }

  timeElapsed: number = 0;
  timeElapsed2: number = 0;

  update2(dt: number): void {
    const homes = this.world.findObjectsInNeighbouringChunks<AntHill>(this.chunk, AntHill, [], 5);
    const foodStuffs = this.world.findObjectsInNeighbouringChunks<Food>(this.chunk, Food, [], 5);

    // set Direction to move fitting for task
    switchTask: switch (this.task) {
      case "runHome":
        // home in Range ?
        for (let home of homes) {
          const distance = Util.distance(this.pos, home.pos);
          const radius = home.hitBox.radius;

          const isInRange = distance < radius + sensoryDistance;

          if (isInRange) {
            // go strait to home
            this.orientation = Util.findAngleLine(this.pos, home.pos);
            break switchTask;
          }
        }

        // follow Pheromones to Home
        this.rotate(this.findRotation("home"));
        break switchTask;
      case "bringFoodHome":
        // Home in Range ?
        for (let home of homes) {
          const distance = Util.distance(this.pos, home.pos);
          const radius = home.hitBox.radius;

          const canPutFood = distance < radius / 2;
          const isInRange = distance < radius + sensoryDistance

          if (canPutFood) {
            // put food in Anthill
            home.food += this.carry;
            this.carry = 0;
            this.task = "searchFood";
            this.turnAround() // turn around after food deposit

            break switchTask;
          } else if (isInRange) {
            this.orientation = Util.findAngleLine(this.pos, home.pos) + this.randomRotation();

            break switchTask;
          }
        }

        // follow Pheromones to Home
        this.rotate(this.findRotation("home"));
        break switchTask;
      case "searchFood":
        // Food in Range ?
        for (let food of foodStuffs) {
          const distance = Util.distance(this.pos, food.pos);
          const radius = food.hitBox.radius;

          const canPickUp = distance < radius / 2;
          const isInRange = distance < radius + sensoryDistance;

          if (canPickUp) {
            // pick up Food
            food.amountFood -= carryAmount;
            this.carry = carryAmount;
            this.task = "bringFoodHome";
            this.turnAround() // turn around after food pickup

            break switchTask;
          } else if (isInRange) {
            this.orientation = Util.findAngleLine(this.pos, food.pos) + this.randomRotation();
            break switchTask;
          }
        }

        // follow Food Pheromons (if none are there => value = 0 => move Random)
        this.rotate(this.findRotation("food", false));
        // go slightly away from home markers
        this.rotate(-this.findRotation("home", false) / 3.33);
        break switchTask;
    }

    // add random Rotation (realism)
    this.rotate(this.randomRotation());

    // eat ?
    for (let home of homes) {
      const distance = Util.distance(this.pos, home.pos);
      const radius = home.hitBox.radius;

      const isInside = distance < radius;

      if (isInside) {
        // eat
        const foodNeeded = maxFood - this.food;

        this.food += foodNeeded;
        // TODO remove Food from AntHill

        if(this.task == "runHome") this.task = "searchFood";
      }
    }

    // move
    // doubled when starving
    const moveSpeed = this.task == "runHome" ? antSpeed * panicSpeedBoost : antSpeed;
    this.moveDirection(this.orientation, this.calc_valueChangeForDT(moveSpeed, dt));

    // creates Pheromon every ... ms;
    this.timeElapsed += dt;
    if (this.timeElapsed > timeBetweenPheromon) {
      this.timeElapsed = 0;
      this.createPheromon();
    }

    // looses ... food every second
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
          if (this.carry >= carryAmount / 3) this.task = "searchFood";
          else this.task = "runHome";
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

  rotate(angle: number): void {
    super.rotate(Math.min(angle, maxRotationAngle));
  }

  turnAround(): void {
    this.orientation += 180 + this.randomRotation();
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
  // Returns undefined when no pheromons found
  followPhermons(message: Message): number | undefined {
    let sumWeightedAngles: number = 0;
    let sumWeights: number = 0;

    const pheromones = this.world.findObjectsInNeighbouringChunks<Pheromon>(this.chunk, Pheromon);

    for (let pheromon of pheromones) {
      // right message ?
      if (pheromon.message != message) continue;

      // right Distance ?
      const distance = Util.distance(this.pos, pheromon.pos);
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

    if (sumWeights == 0) return undefined;

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

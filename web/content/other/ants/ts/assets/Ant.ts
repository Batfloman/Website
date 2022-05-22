import { WorldObject } from "../../../../lib/assets/Objects/WorldObject.js";
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

const antSize = 2;
const antOrientationChange = 7.5;
const timeBetweenPheromon = 75;

const maxFood = 100;
const foodLoss = 5;

const sensoryDistance = 25;
const senseAngle = 45;

const carryAmount = 500;

const antSpeed = 50;

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
        // if no Pheromones turn around
        this.rotate(this.followPhermons("home"));
        break;
      case "bringFoodHome":
        // Home in Range ?
        for (let home of homes) {
          const distance = Util.distance(this.pos, home.pos);
          const radius = home.hitBox.radius;

          if (distance < radius) {
            // eat
            const foodNeeded = maxFood - this.food;

            // TODO remove Food from AntHill
            this.food += foodNeeded;
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
        // random / 3 to not change Direction to much
        this.rotate(this.followPhermons("home"));
        break;
      case "searchFood":
        // Food in Range ?
        for (let food of foodStuffs) {
          const distance = Util.distance(this.pos, food.pos);
          const radius = food.hitBox.radius;

          if (distance < radius) {
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
        this.rotate(this.followPhermons("food"));
        break;
    }

    this.orientation += this.randomRotation();

    // move
    // doubled when starving
    const moveSpeed = this.task == "runHome" ? antSpeed * 1.5 : antSpeed;
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
      // foodLoss / 2 because less activity when starving;
      this.food -= foodLoss;
      // should worry about food ?
      if (this.food <= (maxFood / 100) * 45 && this.task == "searchFood") {
        if (this.carry > 0) {
          const foodNeeded = Math.min(maxFood - this.food, this.carry);

          this.food += foodNeeded;
          this.carry -= foodNeeded;
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
    renderer.setFillColor(Color.none);
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

  // Returns a rotation value to follow the pheromon type
  followPhermons(message: Message): number {
    const pheromons = (this.game.findObjects(Pheromon) as Array<Pheromon>).filter(
      (pheromon) => Util.distance(this.pos, pheromon.pos) < sensoryDistance
    );

    let sumWeightedAngles: number = 0;
    let sumWeights: number = 0;

    for (let pheromon of pheromons) {
      const distance = Util.distance(this.pos, pheromon.pos);

      // if (distance > sensoryDistance || distance < minDistance) continue;
      if (distance > sensoryDistance) continue;
      if (!(pheromon.message == message)) continue;

      const vecToPheromon = pheromon.pos.subtract(this.pos);
      const moveVec = Util.toVector(this.orientation, 1);

      const angle = moveVec.angle(vecToPheromon);
      if (angle > senseAngle || angle < -senseAngle) continue;

      const weight = this.weightPheromon(distance, pheromon.strength);

      sumWeightedAngles += angle * weight;
      sumWeights += weight;
    }

    const rotation = sumWeightedAngles / sumWeights;

    return isNaN(rotation) ? 0 : rotation;
  }

  private weightPheromon(distance: number, strength: number): number {
    const distanceWeight = 2 * (1 - distance / sensoryDistance); // closer => to 1 | further => to 0
    const strengthWeight = this.weightStrength(strength); // older => to 1 | newer => to 0
    return distanceWeight * strengthWeight;
  }

  private weightStrength(strength: number): number {
    return -4 * Math.pow(1 - strength / 100 - 0.5, 2) + 1;
  }

  // Returns a random Rotation to match ant behaviour
  randomRotation(): number {
    return Util.math.randomBetween(-antOrientationChange, antOrientationChange, 2);
  }
}

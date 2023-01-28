import { Hive } from "./Hive.js";
import { Food } from "./Food.js";
import { Pheromon, Message } from "./Pheromon.js";
import { SystemObject } from "../../../myLib/objects/SystemObject.js";
import { settings } from "./main.js";
import { Util } from "../../../myLib/util/Util.js";
import { Game } from "../../../myLib/system/Game.js";
import * as THREE from "three";
import { WorldObject } from "../../../myLib/objects/WorldObject.js";

type TaskIdentifier = "searchFood" | "bringFoodHome" | "runHome";

const antOrientationChange = 5;
const timeBetweenPheromon = 150;

const maxFood = 100;
const foodLoss = 3;
const foodPercentageLeftRunsHome = 50;
const panicSpeedBoost = 1.5;

const senseAngle = 65;

const antSpeed = 75;
const maxRotationAngle = 33;

export class Ant extends WorldObject {
  private currentTask: Task = "searchFood";
  private food: number;
  private carriedFood: number;

  constructor(pos: THREE.Vector3 | THREE.Vector2, color = 0xffffff * Math.random()) {
    const geo = new THREE.CircleGeometry(settings.ant.size);
    const mat = new THREE.MeshBasicMaterial({ color });
    const mesh = new THREE.Mesh(geo, mat);

    const position = pos instanceof THREE.Vector3 ? pos : new THREE.Vector3(pos.x, pos.y, 0);
    super(mesh, position);

    this.food = settings.ant.maxFoodMeter;
    this.carriedFood = 0;
  }

  update(dt: number) {
    switch (this.currentTask) {
      case "bringFoodHome":
        this.bringFoodHome(dt);
        break;
      case "runHome":
        this.runHome(dt);
        break;
      case "searchFood":
      default:
        this.searchFood(dt);
    }
  }

  private bringFoodHome(dt: number) {
    const moveDistance = Util.math.convert.dtToSecValue(dt, settings.ant.speed);
    const hives = Game.instance.object.getAll<Hive>("Hive");

    if (Util.array.isEmpty(hives)) {
      this.moveRandom(moveDistance);
      return;
    }

    const closest = this.findClosest(hives);

    const hiveRadius = settings.hive.size;

    const canSee = closest.distance < hiveRadius + settings.ant.sensoryDistance;
    const canInteract = closest.distance < hiveRadius;

    if (canInteract) {
      closest.obj.addFood(this.carriedFood);
      this.carriedFood = 0;
      this.food = settings.ant.maxFoodMeter;
      this.currentTask = "searchFood";
    } else if (canSee) {
      this.moveTowards(closest.obj, moveDistance);
    }
  }

  private runHome(dt: number) {
    const moveDistance = Util.math.convert.dtToSecValue(dt, settings.ant.speed);
    const hives = Game.instance.object.getAll<Hive>("Hive");

    if (Util.array.isEmpty(hives)) {
      this.moveRandom(moveDistance);
      return;
    }

    const closest = this.findClosest(hives);

    const hiveRadius = settings.hive.size;

    const canSee = closest.distance < hiveRadius + settings.ant.sensoryDistance;
    const canInteract = closest.distance < hiveRadius;

    if (canInteract) {
      closest.obj.addFood(this.carriedFood);
      this.carriedFood = 0;
    } else if (canSee) {
      this.moveTowards(closest.obj, moveDistance);
    } else {
      this.moveRandom(moveDistance);
    }
  }

  private searchFood(dt: number) {
    const moveDistance = Util.math.convert.dtToSecValue(dt, settings.ant.speed);
    const foods = Game.instance.object.getAll<Food>("Food");

    if (Util.array.isEmpty(foods)) {
      this.moveRandom(moveDistance);
      return;
    }

    const closest = this.findClosest(foods);

    const foodGeo = closest.obj.mesh.geometry;
    const scaleFactor = closest.obj.mesh.getWorldScale(new THREE.Vector3()).x;
    const foodRadius = foodGeo instanceof THREE.CircleGeometry ? foodGeo.parameters.radius * scaleFactor : 0.15;

    const canSee = closest.distance < foodRadius + settings.ant.sensoryDistance;
    const canPickUp = closest.distance < Math.max(foodRadius, 0.05); // min 0.05 to avoid very small radius

    if (canPickUp) {
      this.carriedFood += closest.obj.takeFood(settings.ant.maxCarryAmount - this.carriedFood);
      if (this.carriedFood === settings.ant.maxCarryAmount) this.currentTask = "bringFoodHome";
    } else if (canSee) {
      this.moveTowards(closest.obj, moveDistance);
    } else {
      this.moveRandom(moveDistance);
    }
  }

  private moveRandom(distance: number) {
    this.rotateAroundZ(Util.math.random.between(-settings.ant.maxRotation, settings.ant.maxRotation));
    this.move(distance);
  }

  private findClosest<K extends WorldObject>(objects: K[]): { obj: K; distance: number } {
    if (Util.array.isEmpty(objects)) throw new Error("Array is Empty");

    let closest = {
      obj: objects[0],
      distance: Infinity,
    };

    for (let obj of objects) {
      const distance = new THREE.Vector3().subVectors(this.pos, obj.get.pos()).length();
      const isCloser = closest.distance > distance;
      closest = isCloser ? { obj, distance } : closest;
    }

    return closest;
  }
}

class AntTask {
  private name: TaskIdentifier;
}

export class Test {
  task: Task = "searchFood";
  food: number;
  carry: number = 0;

  taskColors = Util.map.copyOf(taskColors);

  constructor(task: Task = "searchFood") {
    this.food = maxFood;
    this.task = task;
  }

  // ==========================================================================================
  //#region main methods

  timeElapsed: number = 0;
  timeElapsed2: number = 0;

  update(dt: number): void {
    const homes = this.world.findObjectsInNeighbouringChunks<Hive>(this.chunk, Hive, [], 5);
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
          const isInRange = distance < radius + sensoryDistance;

          if (canPutFood) {
            // put food in Anthill
            home.food += this.carry;
            this.carry = 0;
            this.task = "searchFood";
            this.turnAround(); // turn around after food deposit

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
            this.turnAround(); // turn around after food pickup

            break switchTask;
          } else if (isInRange) {
            this.orientation = Util.findAngleLine(this.pos, food.pos) + this.randomRotation();
            break switchTask;
          }
        }

        // follow Food Pheromons
        this.rotate(this.findRotation("food", false));
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

        if (this.task == "runHome") this.task = "searchFood";
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
          this.orientation += Util.math.random.between(170, 190, 2);
        }
      }
      // is Dead ?
      if (this.food <= 0) {
        this.game.removeObject(this);
      }
    }
  }
  render(renderer: Renderer): void {
    const color = this.taskColors.get(this.task);
    if (!color) return;

    renderer.setStrokeColor(color);
    renderer.setFillColor(color);
    renderer.renderCircle(this.pos, antSize);
  }

  //#endregion

  // ==========================================================================================
  // #region movement

  rotate(angle: number): void {
    if (angle == 0) return;

    const rotation = Math.min(Math.abs(angle), Math.abs(maxRotationAngle));
    super.rotate(angle <= 0 ? -rotation : rotation);
  }

  turnAround(): void {
    this.orientation += 180 + this.randomRotation();
  }

  //#endregion

  createPheromon(): void {
    let message: Message;
    const c = this.taskColors.get(this.task);
    const color: Color = !c ? Color.get("black") : c;
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

    const pheromon = new Pheromon(this.pos, message);
    pheromon.setHiveId(this.hiveId);
    if (message == "home") pheromon.setColor(color);
    this.game.addObject(pheromon);
  }

  setColor(task: Task, color: Color): void {
    this.taskColors.set(task, color);
  }

  private hiveId: number = 0;

  setHiveId(num: number): void {
    this.hiveId = num;
  }

  // ==========================================================================================
  // #region follow Pheromones

  private pheromonsFoundBefore: boolean = false;
  findRotation(pheromonType: Message, shouldTurnAround = true): number {
    let rotation = this.followPhermons(pheromonType);

    if (rotation == undefined) {
      let returnValue = this.pheromonsFoundBefore ? (shouldTurnAround ? Util.math.random.between(160, 200, 2) : 0) : 0;
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

      // right hive ?
      if (pheromon.hiveId != this.hiveId) continue;

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
    return Util.math.random.between(-antOrientationChange, antOrientationChange, 2);
  }

  //#endregion
}

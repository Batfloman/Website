import { WorldObject } from "../../../../lib/assets/objects/WorldObject.js";
import { Circle } from "../../../../lib/physic/boundingBox/Circle.js";
import { Color } from "../../../../lib/util/Color.js";
import { Util } from "../../../../lib/util/Util.js";
import { Vector2 } from "../../../../lib/util/Vector2.js";
import { Hive } from "./Hive.js";
import { Food } from "./Food.js";
import { Pheromon } from "./Pheromon.js";
const taskColors = new Map([
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
export class Ant extends WorldObject {
    constructor(pos = new Vector2(), task = "searchFood") {
        super(pos, new Circle(antSize), Util.math.random.between(0, 360, 2));
        this.task = "searchFood";
        this.carry = 0;
        this.taskColors = Util.map.copyOf(taskColors);
        this.timeElapsed = 0;
        this.timeElapsed2 = 0;
        this.hiveId = 0;
        this.pheromonsFoundBefore = false;
        this.zIndex = 50;
        this.food = maxFood;
        this.task = task;
    }
    update2(dt) {
        const homes = this.world.findObjectsInNeighbouringChunks(this.chunk, Hive, [], 5);
        const foodStuffs = this.world.findObjectsInNeighbouringChunks(this.chunk, Food, [], 5);
        switchTask: switch (this.task) {
            case "runHome":
                for (let home of homes) {
                    const distance = Util.distance(this.pos, home.pos);
                    const radius = home.hitBox.radius;
                    const isInRange = distance < radius + sensoryDistance;
                    if (isInRange) {
                        this.orientation = Util.findAngleLine(this.pos, home.pos);
                        break switchTask;
                    }
                }
                this.rotate(this.findRotation("home"));
                break switchTask;
            case "bringFoodHome":
                for (let home of homes) {
                    const distance = Util.distance(this.pos, home.pos);
                    const radius = home.hitBox.radius;
                    const canPutFood = distance < radius / 2;
                    const isInRange = distance < radius + sensoryDistance;
                    if (canPutFood) {
                        home.food += this.carry;
                        this.carry = 0;
                        this.task = "searchFood";
                        this.turnAround();
                        break switchTask;
                    }
                    else if (isInRange) {
                        this.orientation = Util.findAngleLine(this.pos, home.pos) + this.randomRotation();
                        break switchTask;
                    }
                }
                this.rotate(this.findRotation("home"));
                break switchTask;
            case "searchFood":
                for (let food of foodStuffs) {
                    const distance = Util.distance(this.pos, food.pos);
                    const radius = food.hitBox.radius;
                    const canPickUp = distance < radius / 2;
                    const isInRange = distance < radius + sensoryDistance;
                    if (canPickUp) {
                        food.amountFood -= carryAmount;
                        this.carry = carryAmount;
                        this.task = "bringFoodHome";
                        this.turnAround();
                        break switchTask;
                    }
                    else if (isInRange) {
                        this.orientation = Util.findAngleLine(this.pos, food.pos) + this.randomRotation();
                        break switchTask;
                    }
                }
                this.rotate(this.findRotation("food", false));
                break switchTask;
        }
        this.rotate(this.randomRotation());
        for (let home of homes) {
            const distance = Util.distance(this.pos, home.pos);
            const radius = home.hitBox.radius;
            const isInside = distance < radius;
            if (isInside) {
                const foodNeeded = maxFood - this.food;
                this.food += foodNeeded;
                if (this.task == "runHome")
                    this.task = "searchFood";
            }
        }
        const moveSpeed = this.task == "runHome" ? antSpeed * panicSpeedBoost : antSpeed;
        this.moveDirection(this.orientation, this.calc_valueChangeForDT(moveSpeed, dt));
        this.timeElapsed += dt;
        if (this.timeElapsed > timeBetweenPheromon) {
            this.timeElapsed = 0;
            this.createPheromon();
        }
        this.timeElapsed2 += dt;
        if (this.timeElapsed2 > 1000) {
            this.timeElapsed2 -= 1000;
            this.food -= foodLoss;
            if (this.food <= (maxFood / 100) * foodPercentageLeftRunsHome && this.task == "searchFood") {
                if (this.carry > 0) {
                    const foodEaten = Math.min(maxFood - this.food, this.carry);
                    this.food += foodEaten;
                    this.carry -= foodEaten;
                    if (this.carry >= carryAmount / 3)
                        this.task = "searchFood";
                    else
                        this.task = "runHome";
                }
                else {
                    this.task = "runHome";
                    this.orientation += Util.math.random.between(170, 190, 2);
                }
            }
            if (this.food <= 0) {
                this.game.removeObject(this);
            }
        }
    }
    render(renderer) {
        const color = this.taskColors.get(this.task);
        if (!color)
            return;
        renderer.setStrokeColor(color);
        renderer.setFillColor(color);
        renderer.renderCircle(this.pos, antSize);
    }
    rotate(angle) {
        super.rotate(Math.min(angle, maxRotationAngle));
    }
    turnAround() {
        this.orientation += 180 + this.randomRotation();
    }
    createPheromon() {
        let message;
        const c = this.taskColors.get(this.task);
        const color = !c ? Color.get("black") : c;
        switch (this.task) {
            case "searchFood":
                message = "home";
                break;
            case "bringFoodHome":
                message = "food";
                break;
            case "runHome":
                return;
        }
        const pheromon = new Pheromon(this.pos, message);
        pheromon.setHiveId(this.hiveId);
        if (message == "home")
            pheromon.setColor(color);
        this.game.addObject(pheromon);
    }
    setColor(task, color) {
        this.taskColors.set(task, color);
    }
    setHiveId(num) {
        this.hiveId = num;
    }
    findRotation(pheromonType, shouldTurnAround = true) {
        let rotation = this.followPhermons(pheromonType);
        if (rotation == undefined) {
            let returnValue = this.pheromonsFoundBefore
                ? shouldTurnAround
                    ? Util.math.random.between(160, 200, 2)
                    : 0
                : 0;
            this.pheromonsFoundBefore = false;
            return returnValue;
        }
        else {
            this.pheromonsFoundBefore = true;
            return rotation;
        }
    }
    followPhermons(message) {
        let sumWeightedAngles = 0;
        let sumWeights = 0;
        const pheromones = this.world.findObjectsInNeighbouringChunks(this.chunk, Pheromon);
        for (let pheromon of pheromones) {
            if (pheromon.message != message)
                continue;
            if (pheromon.hiveId != this.hiveId)
                continue;
            const distance = Util.distance(this.pos, pheromon.pos);
            if (distance > sensoryDistance)
                continue;
            const vecToPheromon = pheromon.pos.subtract(this.pos);
            const moveVec = Util.toVector(this.orientation, 1);
            const angle = moveVec.angle(vecToPheromon);
            if (angle > senseAngle || angle < -senseAngle)
                continue;
            const weight = this.weightPheromon(distance, pheromon.strength);
            sumWeightedAngles += angle * weight;
            sumWeights += weight;
        }
        if (sumWeights == 0)
            return undefined;
        return sumWeightedAngles / sumWeights;
    }
    weightPheromon(distance, strength) {
        const distanceWeight = 2 * (1 - distance / sensoryDistance);
        const strengthWeight = this.weightStrength(strength);
        return distanceWeight * strengthWeight;
    }
    weightStrength(strength) {
        return -4 * Math.pow(1 - strength / 100 - 0.5, 2) + 1;
    }
    randomRotation() {
        return Util.math.random.between(-antOrientationChange, antOrientationChange, 2);
    }
}

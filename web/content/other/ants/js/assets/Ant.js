import { WorldObject } from "../../../../lib/assets/Objects/WorldObject.js";
import Circle from "../../../../lib/physic/boundingBox/Circle.js";
import { Color } from "../../../../lib/util/Color.js";
import Util from "../../../../lib/util/Util.js";
import Vector2 from "../../../../lib/util/Vector2.js";
import AntHill from "./AntHill.js";
import Food from "./Food.js";
import Pheromon from "./Pheromon.js";
const taskColors = new Map([
    ["searchFood", Color.get("white")],
    ["bringFoodHome", Color.get("green")],
    ["runHome", Color.get("yellow")],
]);
const antSize = 2;
const antOrientationChange = 7.5;
const timeBetweenPheromon = 200;
const maxFood = 100;
const foodLoss = 5;
const sensoryDistance = 25;
const senseAngle = 45;
const carryAmount = 500;
const antSpeed = 50;
export default class Ant extends WorldObject {
    constructor(pos = new Vector2(), task = "searchFood") {
        super(pos, new Circle(antSize), Util.math.randomBetween(0, 360, 2));
        this.task = "searchFood";
        this.carry = 0;
        this.timeElapsed = 0;
        this.timeElapsed2 = 0;
        this.zIndex = 50;
        this.food = maxFood;
        this.task = task;
    }
    update2(dt) {
        const homes = this.game.findObjects(AntHill);
        const foodStuffs = this.game.findObjects(Food);
        switchTask: switch (this.task) {
            case "runHome":
                for (let home of homes) {
                    const distance = Util.distance(this.pos, home.pos);
                    const radius = home.hitBox.radius;
                    if (distance < radius) {
                        const foodNeeded = maxFood - this.food;
                        this.food += foodNeeded;
                        this.task = "searchFood";
                        break switchTask;
                    }
                    else if (distance < radius + sensoryDistance) {
                        this.orientation = Util.findAngleLine(this.pos, home.pos);
                        break switchTask;
                    }
                }
                this.rotate(this.followPhermons("home"));
                break;
            case "bringFoodHome":
                for (let home of homes) {
                    const distance = Util.distance(this.pos, home.pos);
                    const radius = home.hitBox.radius;
                    if (distance < radius) {
                        const foodNeeded = maxFood - this.food;
                        this.food += foodNeeded;
                    }
                    if (distance < radius / 2) {
                        home.food += this.carry;
                        this.carry = 0;
                        this.task = "searchFood";
                        this.orientation += Util.math.randomBetween(160, 200, 2);
                        break switchTask;
                    }
                    else if (distance < radius + sensoryDistance) {
                        this.orientation = Util.findAngleLine(this.pos, home.pos);
                        break switchTask;
                    }
                }
                this.rotate(this.followPhermons("home"));
                break;
            case "searchFood":
                for (let food of foodStuffs) {
                    const distance = Util.distance(this.pos, food.pos);
                    const radius = food.hitBox.radius;
                    if (distance < radius) {
                        food.amountFood -= carryAmount;
                        this.carry = carryAmount;
                        this.task = "bringFoodHome";
                        this.orientation += Util.math.randomBetween(160, 200, 2);
                        break switchTask;
                    }
                    else if (distance < radius + sensoryDistance) {
                        this.orientation = Util.findAngleLine(this.pos, food.pos);
                        break switchTask;
                    }
                }
                this.rotate(this.followPhermons("food"));
                break;
        }
        this.orientation += this.randomRotation();
        const moveSpeed = this.task == "runHome" ? antSpeed * 2 : antSpeed;
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
            if (this.food <= (maxFood / 100) * 45 && this.task == "searchFood") {
                if (this.carry > 0) {
                    const foodNeeded = Math.min(maxFood - this.food, this.carry);
                    this.food += foodNeeded;
                    this.carry -= foodNeeded;
                    if (this.carry == 0)
                        this.task = "searchFood";
                }
                else {
                    this.task = "runHome";
                    this.orientation += Util.math.randomBetween(160, 200, 2);
                }
            }
            if (this.food <= 0) {
                this.game.removeObject(this);
            }
        }
    }
    render(renderer) {
        const color = taskColors.get(this.task);
        if (!color)
            return;
        renderer.setStrokeColor(color);
        renderer.setFillColor(Color.none);
        renderer.renderCircle(this.pos, antSize);
    }
    createPheromon() {
        let message;
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
        this.game.addObject(new Pheromon(this.pos, message));
    }
    followPhermons(message) {
        const pheromons = this.game.findObjects(Pheromon).filter((pheromon) => Util.distance(this.pos, pheromon.pos) < sensoryDistance);
        let sumWeightedAngles = 0;
        let sumWeights = 0;
        for (let pheromon of pheromons) {
            const distance = Util.distance(this.pos, pheromon.pos);
            if (distance > sensoryDistance)
                continue;
            if (!(pheromon.message == message))
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
        const rotation = sumWeightedAngles / sumWeights;
        return isNaN(rotation) ? 0 : rotation;
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
        return Util.math.randomBetween(-antOrientationChange, antOrientationChange, 2);
    }
}

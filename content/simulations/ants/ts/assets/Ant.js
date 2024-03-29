"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ant = void 0;
const WorldObject_js_1 = require("../../../../lib/assets/objects/WorldObject.js");
const Circle_js_1 = require("../../../../lib/physic/boundingBox/Circle.js");
const Color_js_1 = require("../../../../lib/util/Color.js");
const Util_js_1 = require("../../../../lib/util/Util.js");
const Vector2_js_1 = require("../../../../lib/util/Vector2.js");
const Hive_js_1 = require("./Hive.js");
const Food_js_1 = require("./Food.js");
const Pheromon_js_1 = require("./Pheromon.js");
const taskColors = new Map([
    ["searchFood", Color_js_1.Color.get("white")],
    ["bringFoodHome", Color_js_1.Color.get("green")],
    ["runHome", Color_js_1.Color.get("yellow")],
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
class Ant extends WorldObject_js_1.WorldObject {
    constructor(pos = new Vector2_js_1.Vector2(), task = "searchFood") {
        super(pos, new Circle_js_1.Circle(antSize), Util_js_1.Util.math.random.between(0, 360, 2));
        this.task = "searchFood";
        this.carry = 0;
        this.taskColors = Util_js_1.Util.map.copyOf(taskColors);
        // ==========================================================================================
        //#region main methods
        this.timeElapsed = 0;
        this.timeElapsed2 = 0;
        this.hiveId = 0;
        // ==========================================================================================
        // #region follow Pheromones
        this.pheromonsFoundBefore = false;
        this.zIndex = 50;
        this.food = maxFood;
        this.task = task;
    }
    update(dt) {
        const homes = this.world.findObjectsInNeighbouringChunks(this.chunk, Hive_js_1.Hive, [], 5);
        const foodStuffs = this.world.findObjectsInNeighbouringChunks(this.chunk, Food_js_1.Food, [], 5);
        // set Direction to move fitting for task
        switchTask: switch (this.task) {
            case "runHome":
                // home in Range ?
                for (let home of homes) {
                    const distance = Util_js_1.Util.distance(this.pos, home.pos);
                    const radius = home.hitBox.radius;
                    const isInRange = distance < radius + sensoryDistance;
                    if (isInRange) {
                        // go strait to home
                        this.orientation = Util_js_1.Util.findAngleLine(this.pos, home.pos);
                        break switchTask;
                    }
                }
                // follow Pheromones to Home
                this.rotate(this.findRotation("home"));
                break switchTask;
            case "bringFoodHome":
                // Home in Range ?
                for (let home of homes) {
                    const distance = Util_js_1.Util.distance(this.pos, home.pos);
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
                    }
                    else if (isInRange) {
                        this.orientation = Util_js_1.Util.findAngleLine(this.pos, home.pos) + this.randomRotation();
                        break switchTask;
                    }
                }
                // follow Pheromones to Home
                this.rotate(this.findRotation("home"));
                break switchTask;
            case "searchFood":
                // Food in Range ?
                for (let food of foodStuffs) {
                    const distance = Util_js_1.Util.distance(this.pos, food.pos);
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
                    }
                    else if (isInRange) {
                        this.orientation = Util_js_1.Util.findAngleLine(this.pos, food.pos) + this.randomRotation();
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
            const distance = Util_js_1.Util.distance(this.pos, home.pos);
            const radius = home.hitBox.radius;
            const isInside = distance < radius;
            if (isInside) {
                // eat
                const foodNeeded = maxFood - this.food;
                this.food += foodNeeded;
                // TODO remove Food from AntHill
                if (this.task == "runHome")
                    this.task = "searchFood";
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
                    if (this.carry >= carryAmount / 3)
                        this.task = "searchFood";
                    else
                        this.task = "runHome";
                }
                else {
                    this.task = "runHome";
                    this.orientation += Util_js_1.Util.math.random.between(170, 190, 2);
                }
            }
            // is Dead ?
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
    //#endregion
    // ==========================================================================================
    // #region movement
    rotate(angle) {
        if (angle == 0)
            return;
        const rotation = Math.min(Math.abs(angle), Math.abs(maxRotationAngle));
        super.rotate(angle <= 0 ? -rotation : rotation);
    }
    turnAround() {
        this.orientation += 180 + this.randomRotation();
    }
    //#endregion
    createPheromon() {
        let message;
        const c = this.taskColors.get(this.task);
        const color = !c ? Color_js_1.Color.get("black") : c;
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
        const pheromon = new Pheromon_js_1.Pheromon(this.pos, message);
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
                    ? Util_js_1.Util.math.random.between(160, 200, 2)
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
    // Returns a rotation value to follow the pheromon type
    // Returns undefined when no pheromons found
    followPhermons(message) {
        let sumWeightedAngles = 0;
        let sumWeights = 0;
        const pheromones = this.world.findObjectsInNeighbouringChunks(this.chunk, Pheromon_js_1.Pheromon);
        for (let pheromon of pheromones) {
            // right message ?
            if (pheromon.message != message)
                continue;
            // right hive ?
            if (pheromon.hiveId != this.hiveId)
                continue;
            // right Distance ?
            const distance = Util_js_1.Util.distance(this.pos, pheromon.pos);
            if (distance > sensoryDistance)
                continue;
            // right Angle ?
            const vecToPheromon = pheromon.pos.subtract(this.pos);
            const moveVec = Util_js_1.Util.toVector(this.orientation, 1);
            const angle = moveVec.angle(vecToPheromon);
            if (angle > senseAngle || angle < -senseAngle)
                continue;
            // everything right!
            const weight = this.weightPheromon(distance, pheromon.strength);
            sumWeightedAngles += angle * weight;
            sumWeights += weight;
        }
        if (sumWeights == 0)
            return undefined;
        return sumWeightedAngles / sumWeights;
    }
    weightPheromon(distance, strength) {
        const distanceWeight = 2 * (1 - distance / sensoryDistance); // closer => to 1 | further => to 0
        const strengthWeight = this.weightStrength(strength); // older => to 1 | newer => to 0
        return distanceWeight * strengthWeight;
    }
    weightStrength(strength) {
        return -4 * Math.pow(1 - strength / 100 - 0.5, 2) + 1;
    }
    // Returns a random Rotation to match ant "behaviour"
    randomRotation() {
        return Util_js_1.Util.math.random.between(-antOrientationChange, antOrientationChange, 2);
    }
}
exports.Ant = Ant;

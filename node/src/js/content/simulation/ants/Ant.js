import { Pheromon } from "./Pheromon.js";
import { settings } from "./main.js";
import { Util } from "../../../myLib/util/Util.js";
import { Game } from "../../../myLib/system/Game.js";
import * as THREE from "three";
import { WorldObject } from "../../../myLib/objects/WorldObject.js";
// const antOrientationChange = 5;
// const timeBetweenPheromon = 150;
// const maxFood = 100;
// const foodLoss = 3;
// const foodPercentageLeftRunsHome = 50;
// const panicSpeedBoost = 1.5;
// const senseAngle = 65;
// const antSpeed = 75;
// const maxRotationAngle = 33;
export class Ant extends WorldObject {
    currentTask = "searchFood";
    food;
    carriedFood;
    color;
    timeSinceLastPheromon = 0;
    timeSinceTaskSwap = 0;
    constructor(pos, color = 0xffffff * Math.random()) {
        const geo = new THREE.CircleGeometry(settings.ant.size);
        const mat = new THREE.MeshBasicMaterial({ color });
        const mesh = new THREE.Mesh(geo, mat);
        super(mesh, pos);
        this.color = color;
        this.food = settings.ant.maxFoodMeter;
        this.carriedFood = 0;
    }
    update(dt) {
        this.timeSinceTaskSwap += dt;
        this.handlePheromons(dt);
        this.handleMovement(dt);
    }
    handleMovement(dt) {
        switch (this.currentTask) {
            case "searchFood":
                this.searchFood(dt);
                break;
            case "bringFoodHome":
                this.moveTowardsHive(dt);
                break;
            case "runHome":
                this.moveTowardsHive(dt, true);
                break;
        }
    }
    searchFood(dt) {
        const moveDistance = Util.math.convert.dtToSecValue(dt, settings.ant.walkSpeed);
        const foods = Game.instance.object
            .getAll("Food")
            .filter((food) => this.pos.distanceTo(food.get.pos()) - food.get.radius() <= settings.ant.sensoryDistance);
        const pheromones = Game.instance.object
            .getAll("Pheromon")
            .filter((pheromon) => pheromon.get.message() === "food")
            .filter((pheromon) => this.pos.distanceTo(pheromon.get.pos()) <= settings.ant.sensoryDistance);
        if (foods.length === 0) {
            for (let pheromon of pheromones) {
                this.rotateTowards(pheromon.get.pos(), settings.ant.maxRotation * Math.min(pheromon.get.strength(), 1));
            }
            this.moveRandom(moveDistance);
            return;
        }
        const closestFood = this.findClosest(foods);
        const canInteract = this.pos.distanceTo(closestFood.get.pos()) < closestFood.get.radius();
        if (canInteract) {
            this.carriedFood += closestFood.takeFood(settings.ant.maxCarryAmount - this.carriedFood);
            if (this.carriedFood === settings.ant.maxCarryAmount) {
                this.currentTask = "bringFoodHome";
                this.timeSinceTaskSwap = 0;
            }
            return;
        }
        this.rotateTowards(closestFood.get.pos(), settings.ant.maxRotation);
        this.moveRandom(moveDistance);
    }
    moveTowardsHive(dt, run = false) {
        const moveDistance = Util.math.convert.dtToSecValue(dt, run ? settings.ant.runSpeed : settings.ant.walkSpeed);
        const hives = Game.instance.object
            .getAll("Hive")
            .filter((hive) => this.pos.distanceTo(hive.get.pos()) - settings.hive.size <= settings.ant.sensoryDistance);
        const pheromones = Game.instance.object
            .getAll("Pheromon")
            .filter((pheromon) => this.pos.distanceTo(pheromon.get.pos()) <= settings.ant.sensoryDistance)
            .filter((pheromon) => pheromon.get.message().match("home"));
        if (hives.length === 0) {
            for (let pheromon of pheromones) {
                this.rotateTowards(pheromon.get.pos(), settings.ant.maxRotation * Math.min(pheromon.get.strength(), 1));
            }
            this.moveRandom(moveDistance);
            return;
        }
        const closestHome = this.findClosest(hives);
        const canInteract = this.pos.distanceTo(closestHome.get.pos()) < settings.hive.size;
        if (canInteract) {
            closestHome.addFood(this.carriedFood);
            this.currentTask = "searchFood";
            this.carriedFood = 0;
            this.timeSinceTaskSwap = 0;
            return;
        }
        this.rotateTowards(closestHome.get.pos(), settings.ant.maxRotation);
        this.moveRandom(moveDistance);
    }
    handlePheromons(dt) {
        if (this.currentTask === "runHome")
            return;
        if ((this.timeSinceLastPheromon += dt) < settings.pheromon.spawnCooldown)
            return;
        this.timeSinceLastPheromon = 0;
        const message = this.currentTask === "searchFood" ? "home" : "food";
        const strength = 10000 / this.timeSinceTaskSwap;
        const color = message === "home" ? this.color : 0x00ff77;
        const pheromon = new Pheromon(this.pos, message, strength, color);
        Game.instance.object.add(pheromon);
    }
    moveRandom(distance) {
        this.rotateAroundZ(Util.math.random.between(-settings.ant.maxRotation, settings.ant.maxRotation));
        this.move(distance);
    }
    findClosest(objects) {
        if (objects.length === 0)
            throw new Error("Array is Empty");
        const diff = new THREE.Vector3();
        let closest = {
            obj: objects[0],
            distance: diff.subVectors(this.pos, objects[0].get.pos()).length(),
        };
        for (let i = 1; i < objects.length; i++) {
            const distance = diff.subVectors(this.pos, objects[i].get.pos()).length();
            if (distance < closest.distance) {
                closest = { obj: objects[i], distance };
            }
        }
        return closest.obj;
    }
}

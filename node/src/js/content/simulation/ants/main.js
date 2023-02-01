import { Game } from "../../../myLib/system/Game.js";
import * as THREE from "three";
import { Food } from "./Food.js";
import { Util } from "../../../myLib/util/Util.js";
import { Hive } from "./Hive.js";
export const settings = {
    board: {
        size: 50,
        initialFoodSpawns: 75,
        foodSpawnCooldown: Infinity,
    },
    hive: {
        size: 2,
        startFood: 2500,
        antCost: 250,
        spawnCooldown: 250,
    },
    food: {
        minValue: 2500,
        maxValue: 10000,
    },
    ant: {
        walkSpeed: 2,
        runSpeed: 5,
        maxFoodMeter: 100,
        size: 0.15,
        sensoryDistance: 2,
        maxCarryAmount: 50,
        maxRotation: 5,
    },
    pheromon: {
        size: 0.1,
        duration: 35000,
        spawnCooldown: 250,
    },
};
const canvas = document.querySelector("canvas") || document.createElement("canvas");
const camera = new THREE.PerspectiveCamera();
camera.position.set(settings.board.size / 2, settings.board.size / 2, settings.board.size * 1.1);
const game = new Game(canvas, { camera });
game.start();
window.addEventListener("wheel", (e) => {
    if (e.deltaY < 100) {
        camera.translateZ(-1);
    }
    else {
        camera.translateZ(1);
    }
});
let leftMouseDown = false;
let lastMPos = { x: 0, y: 0 };
window.addEventListener("mousedown", (e) => {
    if (e.button === 0)
        leftMouseDown = true;
    lastMPos = {
        x: e.clientX,
        y: e.clientY,
    };
});
window.addEventListener("mouseup", (e) => {
    if (e.button === 0)
        leftMouseDown = false;
});
window.addEventListener("mousemove", (e) => {
    if (leftMouseDown) {
        let mPos = {
            x: e.clientX,
            y: e.clientY,
        };
        let diff = {
            x: lastMPos.x - mPos.x,
            y: lastMPos.y - mPos.y,
        };
        lastMPos = mPos;
        camera.translateX(diff.x / 20);
        camera.translateY(-diff.y / 20);
    }
});
const center = new THREE.Vector2(settings.board.size / 2, settings.board.size / 2);
game.object.add(createHive(center, settings.hive.startFood));
for (let i = 0; i < settings.board.initialFoodSpawns; i++) {
    game.object.add(createFood());
}
if (settings.board.foodSpawnCooldown !== Infinity) {
    setInterval(() => {
        game.object.add(createFood());
    }, settings.board.foodSpawnCooldown);
}
// =====
function createFood(position, foodAmount) {
    const amount = foodAmount ?? Util.math.random.between(settings.food.minValue, settings.food.maxValue);
    const pos = position ?? new THREE.Vector2().random().multiplyScalar(settings.board.size);
    return new Food(pos, amount);
}
function createHive(position, foodAmount) {
    const pos = position ?? new THREE.Vector2().random().multiplyScalar(settings.board.size);
    const food = foodAmount ?? 0;
    return new Hive(pos, food);
}

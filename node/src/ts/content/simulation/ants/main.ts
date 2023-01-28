import { Game } from "../../../myLib/system/Game.js";
import * as THREE from "three";
import { Food } from "./Food.js";
import { Util } from "../../../myLib/util/Util.js";
import { Hive } from "./Hive.js";
import { formatDiagnostic } from "typescript";

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
    speed: 2,
    maxFoodMeter: 100,
    size: 0.15,
    sensoryDistance: 1,
    maxCarryAmount: 50,
    maxRotation: 5,
  },
  pheromon: {
    duration: 35000,
  },
};

const canvas = document.querySelector("canvas") || document.createElement("canvas");
const camera = new THREE.PerspectiveCamera();
camera.position.set(settings.board.size / 2, settings.board.size / 2, settings.board.size * 1.1);
const game = new Game(canvas, { camera });
game.start();

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

function createFood(position?: THREE.Vector2, foodAmount?: number): Food {
  const amount = foodAmount ?? Util.math.random.between(settings.food.minValue, settings.food.maxValue);
  const pos = position ?? new THREE.Vector2().random().multiplyScalar(settings.board.size);

  return new Food(pos, amount);
}

function createHive(position?: THREE.Vector2, foodAmount?: number): Hive {
  const pos = position ?? new THREE.Vector2().random().multiplyScalar(settings.board.size);
  const food = foodAmount ?? 0;

  return new Hive(pos, food);
}

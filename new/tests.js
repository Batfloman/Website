import { Util } from "./js/util/Util.js";
import { Game } from "./js/systems/Game.js";
import * as THREE from "three";

const canvas = document.querySelector("#canvas");

const game = new Game();
game.start();

const geo = new THREE.TorusGeometry();
console.log(Util.object.findAllSuperClassNames(geo))
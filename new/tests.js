import { Util } from "./js/util/Util.js";
import { Game } from "./js/systems/Game.js";
import * as THREE from "three";
import { GameObject } from "./js/objects/GameObject.js";
import { Mesh, SphereGeometry } from "three";

const canvas = document.querySelector("#canvas");

const game = new Game(canvas);
game.start();

const sun = new GameObject(new Mesh(new SphereGeometry(1), new THREE.MeshBasicMaterial({ color: 0xffff00 })));
game.object.add(sun);
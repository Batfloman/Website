import * as THREE from "three";
import { Spinner } from "./Spinner.js";
import { Game } from "../../../myLib/system/Game.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/*
          y
          |
          |
          |  z
          | /
x_________|/__________x
         /|
        / |
      /   |
     z    |
          y
*/
const xAxis = new THREE.Vector3(1, 0, 0);
const yAxis = new THREE.Vector3(0, 1, 0);
const zAxis = new THREE.Vector3(0, 0, 1);

// ======

const canvas = document.querySelector("canvas") || document.createElement("canvas");

const loader = new THREE.TextureLoader();
const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 100);
camera.translateZ(10);
const controls = new OrbitControls(camera, canvas);

// ====
const game = new Game(canvas, {
  camera,
});
game.start();

//==

const sunTexture = loader.load("./src/ts/content/pages/index/8k_sun.jpg");
const sun = new THREE.Mesh(new THREE.SphereGeometry(1, 100, 100), new THREE.MeshBasicMaterial({ map: sunTexture }));
// const sunTurnAxis = new THREE.Vector3().random().normalize();
const sunTurnAxis = xAxis;

const planet = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xffffff * Math.random() })
);
// const planetAxis = new THREE.Vector3().random().normalize();
const planetAxis = yAxis;



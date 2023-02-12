import * as THREE from "three";
import { Orbit } from "./Orbit.js";
import { Game } from "../../../myLib/system/Game.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { StarBody } from "./StarBody.js";
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
new OrbitControls(camera, canvas);
// ====
const game = new Game(canvas, {
    camera,
});
game.start();
//==
let sun;
let planet1;
let orbit;
let planet2;
let orbit2;
{
    // sun
    const texture = loader.load("./src/ts/content/pages/index/8k_sun.jpg");
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 100, 100), new THREE.MeshBasicMaterial({ map: texture }));
    const pos = new THREE.Vector3(0, 0, 0);
    const spinAxis = new THREE.Vector3().random().normalize();
    const spinDuration = 10000;
    sun = new StarBody(mesh, pos, spinAxis, spinDuration);
    game.object.add(sun);
}
{
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xffffff * Math.random() }));
    const pos = new THREE.Vector3(2);
    const spinAxis = new THREE.Vector3().random().normalize();
    planet1 = new StarBody(mesh, pos);
    orbit = new Orbit(planet1, new THREE.Vector3(), spinAxis, 10000, 2);
    game.object.add(orbit, planet1);
}
{
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xffffff * Math.random() }));
    const pos = new THREE.Vector3(2);
    const spinAxis = new THREE.Vector3().random().normalize();
    planet2 = new StarBody(mesh, pos);
    orbit2 = new Orbit(planet2, planet1, spinAxis, 1000, 2);
    game.object.add(orbit2, planet2);
}

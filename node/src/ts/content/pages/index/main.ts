import * as THREE from "three";
import { Util } from "../../../myLib/util/Util.js";
import { Satellite } from "./Satellite.js";
import { Game } from "../../../myLib/system/Game.js";

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
      z   |
          y
*/
const xAxis = new THREE.Vector3(1, 0, 0);
const yAxis = new THREE.Vector3(0, 1, 0);
const zAxis = new THREE.Vector3(0, 0, 1);

// ======

const canvas = document.querySelector("canvas") || document.createElement("canvas");

const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 100);
camera.translateZ(10);
const loader = new THREE.TextureLoader();

const game = new Game(canvas, { camera });
game.start();

const axis = new THREE.Vector3(1.5, 1.5, 1.5).normalize();
{
  const sunTexture = loader.load("./src/ts/content/pages/index/8k_sun.jpg");
  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(1, 100, 100),
    // new THREE.MeshBasicMaterial({ color: 0xffff00 })
    new THREE.MeshBasicMaterial({ map: sunTexture, color: 0xffff00 })
  );
  const obj = new Satellite(sun, axis, 10000);
  game.object.add(obj);
}
{
  const group = new THREE.Group();

  const plane = new THREE.Plane(axis);

  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 100, 100),
    new THREE.MeshBasicMaterial({ color: 0xffffff * Math.random() })
  );
  group.add(planet);
  const obj = new Satellite(group, axis, 10000);
  game.object.add(obj);
}
{
}
// ====
{
  const points = [
    new THREE.Vector3(axis.x * 1000, axis.y * 1000, axis.z * 1000),
    new THREE.Vector3(axis.x * -1000, axis.y * -1000, axis.z * -1000),
  ];
  const line = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(points),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  game.get.scene().add(line);
}
{
  const plane = new THREE.PlaneHelper(new THREE.Plane(axis), 10, 0xffffff);
  game.get.scene().add(plane);
}

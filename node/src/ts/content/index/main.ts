import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

window.onresize = resize;

const canvas = document.querySelector("canvas") || document.createElement("canvas");

const renderer = new THREE.WebGLRenderer({ canvas });
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 100);
camera.translateZ(10);
const controls = new OrbitControls(camera, renderer.domElement);

{
  const light = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(light);
}
{
  const light = new THREE.PointLight(0xffffff, 1);
  scene.add(light);
}
{
  const sun = new THREE.Mesh(new THREE.SphereGeometry(1, 100, 100), new THREE.MeshBasicMaterial({ color: 0xffff00 }));
  scene.add(sun);
}
{
  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(0.5),
    new THREE.MeshPhongMaterial({ color: 0xffffff * Math.random() })
  );
  planet.translateX(5);
  scene.add(planet);
}

resize();
loop();

// =====

function loop() {
  renderer.render(scene, camera);

  controls.update();

  requestAnimationFrame(loop);
}

function resize() {
  const w = renderer.domElement.clientWidth;
  const h = renderer.domElement.clientHeight;

  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

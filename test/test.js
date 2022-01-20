import Scene from "../templates/window/Scene.js";
import Window from "../templates/window/Window.js";

var wind = new Window();
var scene = new Scene();
scene.setPosition("left");
wind.addScene(scene);
wind.render();




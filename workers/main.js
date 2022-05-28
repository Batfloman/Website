import { Thread } from "./Thread.js";

// vars
var threads = new Map();

// start
window.onload = () => {
  tick();
};

function tick() {
  threads.set("update", new Thread("./updateObjects.js", "test"));
  threads.set("render", new Thread("./renderObjects.js", "lol"));
} 

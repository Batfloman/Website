import Block from "./gameAssets/Block.js";
import Field from "./gameAssets/Field.js";
import Shape from "./gameAssets/Shape.js";
import Vector2f from "./util/Vector2f.js";
import Options from "./options/Options.js";

var paused = false;
var lastTime = Date.now();
var canvas = document.getElementById("game-screen");
var field = new Field( new Vector2f(9, 18));
var currentShape;
var shapes = await fetch("src/resources/shapes.json").then(response => response.json()).then(json => {return json});
var timePassed = 0;

window.onresize = resizeCanvas;
window.onblur = () => paused = true;
window.onfocus = () => {
    paused = false;
    lastTime = Date.now();
}

field.init(canvas);
resizeCanvas();
window.requestAnimationFrame(loop);

function loop() {
    if(!paused) {
        let now = Date.now();
        let dt = !lastTime ? 0 : now - lastTime;
        lastTime = now;

        if(!currentShape || currentShape.placed) {
            currentShape = new Shape(shapes[Math.floor( Math.random() * shapes.length)]);
            currentShape.init(canvas);
        }
        if((timePassed += dt) > Options.fallSpeed) {
            currentShape.moveDown(dt);
            timePassed = 0;
        }

        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);   
        
        field.render();
    }
    window.requestAnimationFrame(loop);
}
function resizeCanvas() {
    try {
        let smallestWindowSide = Math.min(window.innerHeight, window.innerWidth);
        canvas.height = smallestWindowSide * 0.85;
        canvas.width = canvas.height / 2 ;
        field.render();
    } catch(e) {
        canvas = document.getElementById("game-screen");
    }
}
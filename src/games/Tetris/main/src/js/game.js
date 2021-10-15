let tickSpeed = 500;
let gameTickInterval;

var world = [];
var currentShape;

function start() {
    gameTickInterval = setInterval(gameTick, tickSpeed);
}

function stop() {
    clearInterval(gameTickInterval);
}

function gameTick() {
    moveDown();
    
    draw();
}

function checkFinishedLine() {
    for(let i = 0; i < WORLD_HEIGHT; i++){
        let lineFinished = true;
        for(let j = 0; j < WORLD_WIDTH; j++){
            if(world[i][j] == 0){
                lineFinished = false;
            }
        }
        if(lineFinished == true){
            world[i] = null;
            world = world.filter(a => a != null);
            while(world.length < WORLD_HEIGHT){
                let row = [];
                for(let i = 0; i < WORLD_WIDTH; i++){
                    row.push(0);
                }
                world.unshift(row);
            }
        }
    }
}

function setTickSpeed(value) {
    tickSpeed = value;
}
const WORLD_HEIGHT = 20;
const WORLD_WIDTH = 10;

window.onload() = {
    setUp();
}

function setUp() {
    resetValues();
    createWorld(WORLD_WIDTH, WORLD_HEIGHT);

    createShape();

    draw();
    start();
}

function resetValues() {
    world = [];    
    let gameConatiner = document.getElementById('game-container');
    while(gameConatiner.hasChildNodes()){
        gameConatiner.lastChild.remove();
    }
}

function createWorld(width, height){
    for(let i = 0; i < height; i++){
        let row = [];
        for(let j = 0; j < width; j++) {
            row.push(0);
        }
        world.push(row);
    }

    let canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'game');
    canvas.setAttribute('class', 'game');

    document.getElementById('game-container').appendChild(canvas);
}
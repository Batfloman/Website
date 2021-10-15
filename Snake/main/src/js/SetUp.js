let world = [];
let snake = [];
let fruits = [];
let direction = 'r';
let lastDirection;
let gameInterval;
let gameRunning = false;
let momentOfShock = true;

//setUp

function setUp(){
    clear();
    resetValues();
    createWorld();
    createSnake();
    createFruit();
    draw();
}

function clear(){
    let game_board = document.getElementById('game-board');
    while(game_board.hasChildNodes()){
        game_board.firstChild.remove();
    }
}

function resetValues(){
    world = [];
    snake = [];
    fruits = [];
    direction = 'r';
    lastDirection = 'r';
    gameRunning = false;
    momentOfShock = true;

    snake_options.color = 'yellow';
}

function createWorld(){
    for(let i = 0; i < worldsize; i++){
        let row = [];
        for(let j = 0; j < worldsize; j++){
            row.push(0);
        }
        world.push(row);
    }

    let canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'game');
    canvas.setAttribute('class', `game`);
    document.getElementById('game-board').appendChild(canvas);
}

//draw

function draw(){
    resizeCanvas();
    drawBoard();
    drawSnake();
    drawFruit();
}

function resizeCanvas(){
    let canvas = document.getElementById('game');
    canvas.width = '700';
    canvas.height = canvas.width;

}

function drawBoard(){
    let canvas = document.getElementById('game');
    let ctx = canvas.getContext('2d');
    let cellSize = canvas.height / worldsize;
    ctx.beginPath();
    ctx.lineWidth = 2;

    for(let i = 0; i < worldsize; i++){
        ctx.moveTo(0, cellSize * i);
        ctx.lineTo(canvas.clientWidth, cellSize * i);
        ctx.stroke();
    }
    for(let i = 0; i < worldsize; i++){
        ctx.moveTo(cellSize * i, 0);
        ctx.lineTo(cellSize * i, canvas.height);
        ctx.stroke();
    }
}

function drawSnake(){
    let canvas = document.getElementById('game');
    let ctx = canvas.getContext('2d');
    let cellSize = canvas.height / worldsize;
    ctx.beginPath();

    for(let i = 0; i < snake.length; i++){
        ctx.fillStyle = snake_options.color;
        ctx.fillRect(cellSize*snake[i][0], cellSize*snake[i][1], cellSize, cellSize);
    }
}

function drawFruit(){
    let canvas = document.getElementById('game');
    let ctx = canvas.getContext('2d');
    let cellSize = canvas.height / worldsize;

    ctx.fillStyle = 'purple';
    ctx.fillRect(cellSize*fruits[0][0], cellSize*fruits[0][1], cellSize, cellSize);
}
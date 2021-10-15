var canvas; 
var ctx;

function draw() {
    canvas = document.getElementById('game');
    ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    resizeCanvas();
    drawBlocks();
    drawGrid();
}

function resizeCanvas() {
    canvas.height = window.innerHeight * 0.8;
    canvas.width = canvas.height / 2;
}

function drawGrid() {
    let cellSize = canvas.width / WORLD_WIDTH;
    
    for(let i = 0; i < WORLD_HEIGHT; i++){
        ctx.moveTo(0, cellSize * i);
        ctx.lineTo(canvas.width, cellSize * i);
        ctx.stroke();
    }
    for(let j = 0; j < WORLD_WIDTH; j++){
        ctx.moveTo(cellSize * j, 0);
        ctx.lineTo(cellSize * j, canvas.height);
        ctx.stroke();
    }
}

function drawBlocks() {
    let cellSize = canvas.width / WORLD_WIDTH;

    for(let i = 0; i < world.length; i++){
        for(let j = 0; j < world[0].length; j++){
            if(world[i][j] != 0){
                ctx.fillStyle = Shapes[world[i][j]-1].blockstyle.color;
                ctx.fillRect(cellSize*j, cellSize*i, cellSize, cellSize);
            }
        }
    }
}
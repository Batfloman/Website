var players= ["x", "o"];
var player;
var turns = 0;
var field = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
]
var blocked = false;
var canvas;
var lineWidth;


window.onload = function() {
    canvas = document.getElementById("game-screen");

    player = players[Math.floor( Math.random() * players.length)];
    document.getElementById("info").innerHTML = player;

    canvas.addEventListener('click', fieldClicked);
    
    resize();
}
window.onresize = resize;

function fieldClicked(event) {
    if(blocked) return;
    
    let w = canvas.width / 3;
    let h = canvas.height / 3;
    let x = Math.ceil(event.offsetX / w) - 1;
    let y = Math.ceil(event.offsetY / h) - 1;

    if(field[y][x] == "") {
        field[y][x] = player;
        
        if(hasWon() || ++turns >= 9) {
            blocked = true;
            if(hasWon()) document.getElementById("info").innerHTML = `${player} has Won`;
            else document.getElementById("info").innerHTML = "Draw";
            setTimeout(clearField, 2000);
            draw();
            return;
        }
        changePlayer();
    }
    draw();
}

function resize() {
    canvas.width = canvas.getBoundingClientRect().width;
    canvas.height = canvas.getBoundingClientRect().height;
    lineWidth = canvas.width / 75;
    draw();
}

function draw() {
    let ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().height);

    ctx.strokeStyle = "black";
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    
    let w = canvas.width / 3;
    let h = canvas.height / 3;
    let size = w / 4;
    
    for(let i = 0; i < 4; i++) {
        ctx.moveTo(0, w * i);
        ctx.lineTo(h*3, w * i);
        ctx.moveTo(h * i, 0);
        ctx.lineTo(h * i, w*3);
    }
    ctx.stroke();

    ctx.lineWidth = lineWidth * 1.33;
    for(let x = 0; x < 3; x++) {
        for(let y = 0; y < 3; y++) {
            let xPos = w * x + w/2;
            let yPos = h * y + h/2;
            ctx.beginPath();
            if(field[y][x] == players[0]) {
                ctx.moveTo(xPos - size, yPos - size);
                ctx.lineTo(xPos + size, yPos + size);
                ctx.moveTo(xPos - size, yPos + size);
                ctx.lineTo(xPos + size, yPos - size);
            } else if(field[y][x] == players[1]) {
                ctx.arc(w * x + w/2, h * y + h/2, size, 0, Math.PI * 2);
            }
            ctx.stroke();
        }
    }
}

function changePlayer() {
    player = player == players[0] ? players[1] : players[0];
    document.getElementById("info").innerHTML = player;
}

function hasWon() {
    return checkRows() || checkColumns() || checkDiagonal();
}

function checkRows() {
    return (player == field[0][0] && player == field[0][1] && player == field[0][2])
        || (player == field[1][0] && player == field[1][1] && player == field[1][2])
        || (player == field[2][0] && player == field[2][1] && player == field[2][2]);
}

function checkColumns() {
    return (player == field[0][0] && player == field[1][0] && player == field[2][0])
        || (player == field[0][1] && player == field[1][1] && player == field[2][1])
        || (player == field[0][2] && player == field[1][2] && player == field[2][2]);
}

function checkDiagonal() {
    return (player == field[0][0] && player == field[1][1] && player == field[2][2])
        || (player == field[2][0] && player == field[1][1] && player == field[0][2]);
}

function clearField() {
    blocked = false;
    turns = 0;
    for(let i = 0; i < 3; i++) {
        field[i] = ["", "", ""];
    }
    changePlayer();
    draw();
}
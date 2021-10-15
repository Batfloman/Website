const RED = {name: "red", color: "rgb(255, 40, 40)", previewColor: "rgb(255, 180, 180)"};
const YELLOW = {name: "yellow", color: "rgb(255, 255, 40)", previewColor: "rgb(255, 255, 215)"};

var player = RED;
var blocked = false;

function clicked(x){
    if(columnFull(x) || blocked) return;

    turns++;
    let xPos = x;
    let yPos = getLowestYPos(x)
    placeCoin(x, yPos);
    checkIfEnded(x, yPos);
    changeTurn();
    previewTurn(x);
}

function columnFull(x){
    let column = Array.from(gameCells[x]);
    return !(column[0] == "");
}

function getLowestYPos(x){
    let column = Array.from(gameCells[x]);
    column.reverse();
    for(let i = 0; i < column.length; i++){
        if(column[i] == ""){
            return (CELLS_Y - i - 1);
        }
    }
}

function placeCoin(x, y){
    document.getElementById(`cell-${x}-${y}`).style.backgroundColor = player.color;
    gameCells[x][y] = player.name;
}

function changeTurn(){
    if(player == RED) player = YELLOW;
    else player = RED; 
    // setTimeout( botTurn, 500);
}

//style

function previewTurn(x){
    if(columnFull(x) || blocked){
        return;
    }
    let xPos = x;
    let yPos = getLowestYPos(x);
    document.getElementById(`cell-${xPos}-${yPos}`).style.backgroundColor = player.previewColor;
}

function cancelPreviewTurn(x){
    if(columnFull(x) || blocked){
        return;
    }
    let xPos = x;
    let yPos = getLowestYPos(x);
    document.getElementById(`cell-${xPos}-${yPos}`).style.backgroundColor = "white";
}
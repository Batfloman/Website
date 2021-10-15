const MAX_TURNS = CELLS_X * CELLS_Y;

var turns = 0;

function checkIfEnded(xPos, yPos){
    if(turns == MAX_TURNS){
        startNewGame("Draw!");
        return;
    }
    checkIfWon(xPos, yPos);
}

function checkIfWon(xPos, yPos){
    checkHorizontal(xPos, yPos);
    checkVertical(xPos, yPos);
    checkDiagonal(xPos, yPos);
}

function checkHorizontal(xPos, yPos){
    let x = xPos;
    let y = yPos;
    let inRow = 1;
    if(x > 0){
        x--;
        while(x >= 0 && gameCells[x][y] == player.name){
            inRow++;
            x--;
        }
    }
    x = xPos;
    y = yPos;
    if(x < (CELLS_X-1)){
        x++;
        while(x < CELLS_X && gameCells[x][y] == player.name ){
            inRow++;
            x++;
        }
    }
    if(inRow >= 4){
        startNewGame(`<span style="color: ${player.color}">${player.name}</span><span> has Won!</span>`);
    }
}

function checkVertical(xPos, yPos){
    let x = xPos;
    let y = yPos;
    let inRow = 1;
    if(y > 0){
        y--;
        while(y >= 0 && gameCells[x][y] == player.name){
            inRow++;
            y--;
        }
    }
    x = xPos;
    y = yPos;
    if(y < (CELLS_Y-1)){
        y++;
        while(y < CELLS_Y && gameCells[x][y] == player.name){
            inRow++;
            y++;
        }
    }
    if(inRow >= 4){
        startNewGame(`<span style="color: ${player.color}">${player.name}</span><span> has Won!</span>`);
    }
}

function checkDiagonal(xPos, yPos){
    let x = xPos;
    let y = yPos;
    let inRow = 1;
    if(x > 0 && y > 0){
        x--;
        y--;
        while(x >= 0 && y >= 0 && gameCells[x][y] == player.name){
            inRow++;
            x--;
            y--;
        }
    }
    x = xPos;
    y = yPos;
    if(x < (CELLS_X-1) && y < (CELLS_Y-1)){
        x++;
        y++;
        while(x < CELLS_X && y < CELLS_Y && gameCells[x][y] == player.name){
            inRow++;
            x++;
            y++;
        }
    }
    if(inRow >= 4){
        startNewGame(`<span style="color: ${player.color}">${player.name}</span><span> has Won!</span>`);
    } else{
        inRow = 1;
    }
    x = xPos;
    y = yPos;
    if(x > 0 && y < (CELLS_Y-1)){
        x--;
        y++;
        while(x >= 0 && y < CELLS_Y && gameCells[x][y] == player.name){
            inRow++;
            x--;
            y++;
        }
    }
    x = xPos;
    y = yPos;
    if(x < (CELLS_X-1) && y > 0){
        x++;
        y--;
        while(x < CELLS_X && y >= 0 && gameCells[x][y] == player.name){
            inRow++;
            x++;
            y--;
        }
    }
    if(inRow >= 4){
        startNewGame(`<span style="color: ${player.color}">${player.name}</span><span> has Won!</span>`);
    }
}

function startNewGame(endMessage){
    blocked = true;
    document.getElementById("text-field").innerHTML = endMessage;
    setTimeout(setUp, 2500);
}

//-------

function checkDirection(dir) {
    switch(dir){
        case 'l':
            break;
        case 'lu':
            break;
        case 'u':
            break;
        case 'ur':
            break;
        case 'r':
            break;
        case 'rd':
            break;
        case 'd':
            break;
        case 'ld':
            break;
    }
}
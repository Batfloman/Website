const CELLS_X = 7;
const CELLS_Y = 6;

var gameCells = new Array();

setUp();

function setUp() {
    resetValues();
    createArray();
    generateCells();
}

function resetValues(){
    blocked = false;
    turns = 0;
    gameCells = [];
    document.getElementById("text-field").innerHTML = null;
    document.getElementById("game").innerHTML = null;
}

function createArray() {
    for(let i = 0; i < CELLS_X; i++){
        let row = new Array();
        for(let j = 0; j < CELLS_Y; j++){
            row.push("");
        }
        gameCells.push(row);
    }
}

function generateCells() {
    for(let i = 0; i < CELLS_X; i++){
        let column = document.createElement("div")
        column.setAttribute("id", `column${i}`)
        column.setAttribute("class", "column")
        column.setAttribute("onclick", `clicked(${i});`)
        column.setAttribute("onmouseover", `previewTurn(${i})`)
        column.setAttribute("onmouseout", `cancelPreviewTurn(${i})`);

        for(let j = 0; j < CELLS_Y; j++){
            let cell = document.createElement("div");
            cell.setAttribute("id", `cell-${i}-${j}`);
            cell.setAttribute("class", "cell");

            column.appendChild(cell);
        }
        document.getElementById("game").appendChild(column);
    }
}

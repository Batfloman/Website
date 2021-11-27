import Player from "../../../../../templates/actor/Player.js";
import GameBoard from "../GameBoard.js";
import Vector2f from "../../../../../templates/util/Vector2f.js";

export default class TicTacToePlayer extends Player {
    constructor(symbol) {
        super();

        this.symbol = symbol;
    }

    mouseInput(event) {
        if(!this.isMyTurn) return;

        if(event.type == "mousedown") {
            let clickedCoord = new Vector2f(event.offsetX, event.offsetY)

            let gameBoards = this.game.findObjects(GameBoard);
            let board;

            gameBoards.forEach(gameBoard => {
                if(gameBoard.overlaps(clickedCoord)) {
                    let clickedPos = gameBoard.getCell(clickedCoord);
                    if(gameBoard.isCellEmpty(clickedPos)) {
                        gameBoard.setCell(clickedPos, this.symbol);
                        this.endTurn();
                    }
                }
            });
        };
    }
}
import Player from "../../../../../templates/actor/Player.js";
import GameBoard from "../../../../../templates/gameAssets/GameBoard.js";
import Vector2f from "../../../../../templates/util/Vector2f.js";

export default class TicTacToePlayer extends Player {
    constructor() {
        super();
    }

    mouseInput(event) {
        if(event.type == "mousedown") {
            let gameBoards = this.game.findObjects(GameBoard);
            let board;

            gameBoards.forEach(gameBoard => {
                if(gameBoard.overlaps( new Vector2f(event.offsetX, event.offsetY))) {
                    board = gameBoard;
                }
            })
        };
    }
}
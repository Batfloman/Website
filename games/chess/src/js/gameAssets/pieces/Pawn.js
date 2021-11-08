import Piece from "../Piece.js";

export default class Pawn extends Piece {
    static imageNames = ["white_pawn", "black_pawn"];
    static images = new Map();

    firstTurn;
    
    constructor(player, x, y) {
        super(player, x, y);
        this.img = Pawn.images.get(player.getColor());
        this.firstTurn = true;
    }

    showMoves() {
        
    }
}
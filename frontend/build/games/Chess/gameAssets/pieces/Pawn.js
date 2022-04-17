import Piece from "../Piece.js";
export default class Pawn extends Piece {
    constructor(player, x, y) {
        super(player, x, y);
        this.img = Pawn.images.get(player.getColor());
        this.firstTurn = true;
    }
    showMoves() {
    }
}
Pawn.imageNames = ["white_pawn", "black_pawn"];
Pawn.images = new Map();

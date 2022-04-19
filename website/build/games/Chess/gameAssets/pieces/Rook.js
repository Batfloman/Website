import Piece from "../Piece.js";
export default class Rook extends Piece {
    constructor(player, x, y) {
        super(player, x, y);
        this.img = Rook.images.get(player.getColor());
    }
    showMoves() {
    }
}
Rook.imageNames = ["white_rook", "black_rook"];
Rook.images = new Map();

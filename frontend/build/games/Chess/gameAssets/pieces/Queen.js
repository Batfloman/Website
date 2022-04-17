import Piece from "../Piece.js";
export default class Queen extends Piece {
    constructor(player, x, y) {
        super(player, x, y);
        this.img = Queen.images.get(player.getColor());
    }
    showMoves() {
    }
}
Queen.imageNames = ["white_queen", "black_queen"];
Queen.images = new Map();

import Piece from "../Piece.js";
export default class King extends Piece {
    constructor(player, x, y) {
        super(player, x, y);
        this.img = King.images.get(player.getColor());
    }
    showMoves() {
    }
}
King.imageNames = ["white_king", "black_king"];
King.images = new Map();

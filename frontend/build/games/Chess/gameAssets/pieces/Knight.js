import Piece from "../Piece.js";
export default class Knight extends Piece {
    constructor(player, x, y) {
        super(player, x, y);
        this.img = Knight.images.get(player.getColor());
    }
    showMoves() {
    }
}
Knight.imageNames = ["white_knight", "black_knight"];
Knight.images = new Map();

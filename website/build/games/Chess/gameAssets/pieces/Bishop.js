import Piece from "../Piece.js";
export default class Bishop extends Piece {
    constructor(player, x, y) {
        super(player, x, y);
        this.img = Bishop.images.get(player.getColor());
    }
    showMoves() {
    }
}
Bishop.imageNames = ["white_bishop", "black_bishop"];
Bishop.images = new Map();

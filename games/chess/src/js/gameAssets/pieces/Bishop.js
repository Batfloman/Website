import Piece from "../Piece.js";

export default class Bishop extends Piece {
    static imageNames = ["white_bishop", "black_bishop"];
    static images = new Map();

    constructor(player, x, y) {
        super(player, x, y);
        this.img = Bishop.images.get(player.getColor());
    }

    showMoves() {
        
    }
}
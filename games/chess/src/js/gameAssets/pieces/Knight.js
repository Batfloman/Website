import Piece from "../Piece.js";

export default class Knight extends Piece {
    static imageNames = ["white_knight", "black_knight"];
    static images = new Map();

    constructor(player, x, y) {
        super(player, x, y);
        this.img = Knight.images.get(player.getColor());
    }

    showMoves() {
        
    }
}
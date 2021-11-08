import Piece from "../Piece.js";

export default class Rook extends Piece {
    static imageNames = ["white_rook", "black_rook"];
    static images = new Map();
    
    constructor(player, x, y) {
        super(player, x, y);
        this.img = Rook.images.get(player.getColor());
    }

    showMoves() {
        
    }
}
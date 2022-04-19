import Piece from "../Piece.js";

export default class Queen extends Piece {
    static imageNames = ["white_queen", "black_queen"];
    static images = new Map();
    
    constructor(player, x, y) {
        super(player, x, y);
        this.img = Queen.images.get(player.getColor());
    }

    showMoves() {
        
    }
}
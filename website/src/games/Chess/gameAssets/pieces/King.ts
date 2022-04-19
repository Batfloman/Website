import Piece from "../Piece.js";

export default class King extends Piece {
    static imageNames = ["white_king", "black_king"];
    static images = new Map();
    
    constructor(player, x, y) {
        super(player, x, y);
        this.img = King.images.get(player.getColor());
    }

    showMoves() {
        
    }
}
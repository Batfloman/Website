import GameObject from "../../../../templates/gameAssets/GameObject.js";
import Color from "../../../../templates/util/Color.js";
import Board from "./Board.js";

export default class Block extends GameObject {
    x;
    y;

    color;

    timePassed = 0;
    
    constructor(x, y, color) {
        super();

        this.x = x;
        this.y = y;
        this.color = !color ? Color.getRandom() : color;
    }

    init(game) {
        super.init(game);
        this.board = this.game.findObjects(Board)[0];
    }

    render() {
        let ctx = this.canvas.getContext('2d');

        ctx.fillStyle = this.color.getRGB();

        let xPos = this.x * this.canvas.width/this.board.x;
        let yPos = this.canvas.height - this.y * this.canvas.height/this.board.y;

        ctx.fillRect(xPos, yPos, this.canvas.width/this.board.x, this.canvas.height/this.board.y);
    }

    moveDown() {
        this.y--;
        if(this.y < 0) this.y = this.board.y;
    }

    moveLeft() {
        this.x--;
    }

    moveRight() {
        this.x++;
    }
}
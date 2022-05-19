import { WorldObject } from "../../../lib/assets/WorldObject.js";
import Rectangel from "../../../lib/physic/boundingBox/Rectangel.js";
export default class Cell extends WorldObject {
    constructor(board) {
        const pos = board.pos;
        const hitBox = new Rectangel(board.hitBox.width / board.grid.getSizeX(), board.hitBox.height / board.grid.getSizeY());
        const boardOrientation = board.orientation;
        super(pos, hitBox, boardOrientation);
        this.board = board;
    }
    update2(dt) { }
    render(renderer) {
        console.log("render");
        renderer.renderRectangle(this.pos, this.hitBox.width, this.hitBox.height);
    }
}

import Polygon2 from "../../../lib/physic/boundingBox/Polygon2.js";
import Matrix2 from "../../../lib/util/Matrix2.js";
import Rectangle from "../../../lib/physic/boundingBox/Rectangel.js";
import { Color } from "../../../lib/util/Color.js";
import { WorldObject } from "../../../lib/assets/WorldObject.js";
export default class Board extends WorldObject {
    constructor(pos, xSize, ySize) {
        super(pos, new Polygon2([]));
        this.grid = new Matrix2(xSize, ySize);
        this.zIndex = -1;
    }
    init(game, canvas) {
        super.init(game, canvas);
        this.hitBox = new Rectangle(this.canvas.width / 2, this.canvas.height / 2);
    }
    update(dt) { }
    render(renderer) {
        renderer.setLineWidth(this.canvas.width / this.grid.getSizeX() / 50);
        renderer.setStrokeColor(Color.get("black"));
        renderer.setFillColor(Color.none);
        renderer.renderGrid(this.pos, this.grid.getSizeX(), this.grid.getSizeY(), this.canvas.width / this.grid.getSizeX(), this.canvas.height / this.grid.getSizeY());
    }
}

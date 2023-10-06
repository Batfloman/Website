"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridWorld = void 0;
const Input_js_1 = require("../../input/Input.js");
const Matrix2_js_1 = require("../../util/Matrix2.js");
const Util_js_1 = require("../../util/Util.js");
const Vector2_js_1 = require("../../util/Vector2.js");
const GridCell_js_1 = require("../objects/GridCell.js");
const RectangleWorld_js_1 = require("./RectangleWorld.js");
class GridWorld extends RectangleWorld_js_1.RectangleWorld {
    constructor(width, height, xSize, ySize) {
        super(width, height);
        this.grid = new Matrix2_js_1.Matrix2(xSize, ySize);
        this.xSize = xSize;
        this.ySize = ySize;
        this.cellWidth = width / xSize;
        this.cellHeight = height / ySize;
        Input_js_1.Input.newEventListener("resize", this, this.resize);
        this.resize();
    }
    resize() {
        this.cellWidth = this.width / this.xSize;
        this.cellHeight = this.height / this.ySize;
    }
    clicked(worldPos) {
        const gridPos = this.findGridPosition(worldPos);
        if (this.grid.isCellEmpty(gridPos.x, gridPos.y))
            return;
        const content = this.grid.get(gridPos.x, gridPos.y);
        if (typeof content === "string")
            return;
        for (let obj of content) {
            obj.notifyOfClick(worldPos);
        }
    }
    findGridPosition(worldPos) {
        const bottomLeft = new Vector2_js_1.Vector2(this.pos.x - this.width / 2, this.pos.y - this.height / 2);
        const offSet = worldPos.subtract(bottomLeft);
        const pos = new Vector2_js_1.Vector2(Math.floor(offSet.x / this.cellWidth), Math.floor(offSet.y / this.cellHeight));
        return pos;
    }
    render(renderer) {
        renderer.renderGrid(new Vector2_js_1.Vector2(), this.xSize, this.ySize, this.cellWidth, this.cellHeight);
    }
    // override
    putObjectsInCunks() {
        this.putObjectsInGrid();
        super.putObjectsInCunks();
    }
    putObjectsInGrid() {
        const gridObjects = this.findObjects(GridCell_js_1.GridCell);
        for (let obj of gridObjects) {
            if (!obj.recentlyMoved)
                continue;
            this.removeFromGrid(obj);
            this.addToGrid(obj);
        }
    }
    addCell(cell) {
        this.game.addObject(cell);
        cell.setGrid(this);
        cell.init(this.game, this.game.getCanvas());
        cell.recentlyMoved = true;
    }
    removeFromGrid(obj) {
        const pos = obj.gridPos;
        const content = this.grid.get(pos.x, pos.y);
        if (typeof content === "string")
            return;
        if (!content.includes(obj))
            return;
        return Util_js_1.Util.array.removeItem(content, obj);
    }
    addToGrid(obj) {
        const pos = this.findGridPosition(obj.pos);
        obj.gridPos = pos;
        if (this.grid.isCellEmpty(pos.x, pos.y)) {
            this.grid.set(pos.x, pos.y, [obj]);
            return;
        }
        const content = this.grid.get(pos.x, pos.y);
        if (typeof content === "string") {
            this.grid.set(pos.x, pos.y, [obj]);
            return;
        }
        content.push(obj);
    }
}
exports.GridWorld = GridWorld;

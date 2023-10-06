"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matrix2 = void 0;
const Util_js_1 = require("./Util.js");
class Matrix2 {
    constructor(x, y) {
        this.cells = [];
        this.xSize = x;
        this.ySize = y;
        for (let i = 0; i < y; i++) {
            let arr = [];
            for (let j = 0; j < x; j++) {
                arr.push("[]");
            }
            this.cells.push(arr);
        }
    }
    isCellEmpty(x, y) {
        return this.get(x, y) === "[]";
    }
    clearCell(x, y) {
        this.set(x, y, "[]");
    }
    get(x, y) {
        const yIndex = this.ySize - y - 1;
        return Util_js_1.Util.array.getItem(Util_js_1.Util.array.getItem(this.cells, yIndex), x);
    }
    set(x, y, content) {
        if (x < 0 || x >= this.getSizeX()) {
            console.warn(`${x} is out of Bounds!`);
            return;
        }
        if (y < 0 || y >= this.getSizeY()) {
            console.warn(`${y} is out of Bounds!`);
            return;
        }
        const yIndex = this.ySize - y - 1;
        this.cells[yIndex][x] = content;
    }
    getSizeX() {
        return this.xSize;
    }
    getSizeY() {
        return this.ySize;
    }
}
exports.Matrix2 = Matrix2;

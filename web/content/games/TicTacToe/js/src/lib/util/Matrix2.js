import Util from "./Util.js";
export default class Grid {
    constructor(x, y) {
        this.cells = [];
        for (let i = 0; i < y; i++) {
            let arr = [];
            for (let j = 0; j < x; j++) {
                arr.push("[]");
            }
            this.cells.push(arr);
        }
    }
    get(x, y) {
        return Util.getItem(Util.getItem(this.cells, x), y);
    }
    set(x, y, content) {
        this.cells[y][x] = content;
    }
}

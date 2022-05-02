import Util from "./Util";
export default class Grid {
    constructor(x, y) {
        this.cells = [];
        for (let i = 0; i < x; i++) {
            let arr = [];
            for (let j = 0; j < y; j++) {
                arr.push("[]");
            }
            this.cells.push(arr);
        }
    }
    get(x, y) {
        return Util.getItem(Util.getItem(this.cells, x), y);
    }
}

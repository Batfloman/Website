import Util from "./Util.js";

export default class Grid {
  cells: Array<Array<string>>;

  constructor(x: number, y: number) {
    this.cells = [];
    for(let i = 0; i < x; i++) {
      let arr = [];
      for(let j = 0; j < y; j++) {
        arr.push("[]");
      }
      this.cells.push(arr);
    }
  }

  get(x: number, y: number) {
    return Util.getItem(Util.getItem(this.cells, x), y);
  }
}
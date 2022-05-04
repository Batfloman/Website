import Util from "./Util.js";

export default class Grid {
  cells: Array<Array<string>>;

  constructor(x: number, y: number) {
    this.cells = [];
    for(let i = 0; i < y; i++) {
      let arr = [];
      for(let j = 0; j < x; j++) {
        arr.push("[]");
      }
      this.cells.push(arr);
    }
  }

  get(x: number, y: number) {
    return Util.getItem(Util.getItem(this.cells, x), y);
  }

  set(x: number, y: number, content: string) {
    this.cells[y][x] = content;
  }
}
import Util from "./Util.js";

export default class Matrix2<T> {
  cells: Array<Array<T | string>>;

  constructor(x: number, y: number) {
    this.cells = [];
    for (let i = 0; i < y; i++) {
      let arr = [];
      for (let j = 0; j < x; j++) {
        arr.push("[]");
      }
      this.cells.push(arr);
    }
  }

  get(x: number, y: number) {
    return Util.array.getItem(Util.array.getItem(this.cells, x), y);
  }

  set(x: number, y: number, content: string | T) {
    this.cells[y][x] = content;
  }

  getSizeX() {
    return this.cells[0].length;
  }

  getSizeY() {
    return this.cells.length;
  }
}

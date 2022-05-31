import { Util } from "./Util.js";

export class Matrix2<T> {
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

  get(x: number, y: number): T | string {
    return Util.array.getItem(Util.array.getItem(this.cells, x), y);
  }

  set(x: number, y: number, content: string | T): void {
    this.cells[y][x] = content;
  }

  getSizeX(): number {
    return this.cells[0].length;
  }

  getSizeY(): number {
    return this.cells.length;
  }
}

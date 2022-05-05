export default class Matrix2<T> {
    cells: Array<Array<T | string>>;
    constructor(x: number, y: number);
    get(x: number, y: number): string | T;
    set(x: number, y: number, content: string | T): void;
    getSizeX(): number;
    getSizeY(): number;
}

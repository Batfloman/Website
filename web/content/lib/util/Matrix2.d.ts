export default class Grid {
    cells: Array<Array<string>>;
    constructor(x: number, y: number);
    get(x: number, y: number): string;
    set(x: number, y: number, content: string): void;
}

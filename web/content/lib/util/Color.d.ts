export declare class Color {
    static none: null;
    r: number;
    g: number;
    b: number;
    static getRandom(): Color;
    static get(color: string): Color | undefined;
    constructor(r: number, g: number, b: number);
    getRGBString(): string;
    setR(r: number): void;
    setG(g: number): void;
    setB(b: number): void;
}

export declare class Color {
    static none: Color;
    r: number;
    g: number;
    b: number;
    a: number;
    static getRandom(): Color;
    static get(color: colors): Color | undefined;
    constructor(r: number, g: number, b: number, a?: number);
    getRGBString(): string;
    setR(r: number): void;
    setG(g: number): void;
    setB(b: number): void;
    setA(a: number): void;
}
declare type colors = "red" | "green" | "blue" | "black" | "white";
declare const colors: Map<colors, Color>;
export {};

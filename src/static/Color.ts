export default class Color {
    r: number;
    g: number;
    b: number;
    
    constructor(r: number, g: number, b: number) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    getRGBValue() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }

    static getRandom() {
        return new Color(
            Math.floor(Math.random()*255),
            Math.floor(Math.random()*255),
            Math.floor(Math.random()*255)
        );
    }
}
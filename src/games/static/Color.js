export default class Color {
    constructor(r, g, b) {
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
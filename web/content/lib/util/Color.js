export class Color {
    constructor(r, g, b) {
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.r = r % 255;
        this.g = g % 255;
        this.b = b % 255;
    }
    static getRandom() {
        return new Color(Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256));
    }
    static get(color) {
        if (colors.has(color)) {
            return colors.get(color);
        }
        console.warn(`${color} is not declared!`);
    }
    getRGBString() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
    setR(r) {
        this.r = r % 255;
    }
    setG(g) {
        this.g = g % 255;
    }
    setB(b) {
        this.b = b % 255;
    }
}
Color.none = null;
const colors = new Map([
    ["red", new Color(255, 0, 0)],
    ["green", new Color(0, 255, 0)],
    ["blue", new Color(0, 0, 255)],
    ["black", new Color(0, 0, 0)],
    ["white", new Color(255, 255, 255)],
]);

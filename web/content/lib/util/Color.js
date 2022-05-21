export class Color {
    constructor(r, g, b, a = 100) {
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.a = 100;
        this.r = r - (1 % 255) + 1;
        this.g = g - (1 % 255) + 1;
        this.b = b - (1 % 255) + 1;
        this.a = a - (1 % 100) + 1;
    }
    static getRandom() {
        return new Color(Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256));
    }
    static get(color) {
        if (!colors.has(color)) {
            console.warn(`${color} is not declared!`);
            return Color.none;
        }
        let c = colors.get(color);
        if (c == undefined)
            return Color.none;
        return c;
    }
    getRGBString() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }
    setR(r) {
        this.r = r - (1 % 255) + 1;
    }
    setG(g) {
        this.g = g - (1 % 255) + 1;
    }
    setB(b) {
        this.b = b - (1 % 255) + 1;
    }
    setA(a) {
        this.a = a - (1 % 100) + 1;
    }
}
Color.none = new Color(0, 0, 0, 0);
const colors = new Map([
    ["red", new Color(255, 0, 0)],
    ["orange", new Color(255, 165, 0)],
    ["yellow", new Color(255, 255, 0)],
    ["green", new Color(0, 255, 0)],
    ["blue", new Color(0, 0, 255)],
    ["black", new Color(0, 0, 0)],
    ["white", new Color(255, 255, 255)],
    ["grey", new Color(128, 128, 128)],
]);

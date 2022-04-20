export default class Color {
    constructor(r, g, b) {
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.r = r > 255 ? r % 255 : r;
        this.g = g > 255 ? g % 255 : g;
        this.b = b > 255 ? b % 255 : b;
    }
    static getRandom() {
        return new Color(Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256));
    }
    getRGBValue() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
    setR(r) { this.r = r > 255 ? r % 255 : r; }
    setG(g) { this.g = g > 255 ? g % 255 : g; }
    setB(b) { this.b = b > 255 ? b % 255 : b; }
}
Color.none = null;
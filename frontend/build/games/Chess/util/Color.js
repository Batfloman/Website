export default class Color {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    getColor() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
    hasName() {
        for (let key in Color.predefinedColors) {
            if (Color.predefinedColors[key] == this)
                return true;
        }
        ;
        return false;
    }
    getName() {
        for (let key in Color.predefinedColors) {
            if (Color.predefinedColors[key] == this)
                return key;
        }
        ;
        return this.getRGB();
    }
    getRGB() {
        return `rgb(${this.r}, ${this.b}, ${this.g})`;
    }
    static get(name) {
        return Color.predefinedColors[name];
    }
}
Color.predefinedColors = {
    "white": new Color(255, 255, 255),
    "black": new Color(0, 0, 0)
};

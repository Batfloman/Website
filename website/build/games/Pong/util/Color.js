export default class Color {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    static getRandom() {
        return new Color(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255));
    }
    static get(name) {
        return Color.predefined[name] || Color.getRandom();
    }
}
Color.predefined = {
    "white": new Color(255, 255, 255),
    "black": new Color(0, 0, 0)
};

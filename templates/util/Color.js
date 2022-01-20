export default class Color {
    
    r;
    g;
    b;

    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    getRGB() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }

    // static

    static get(name) {
        return !Color.predefinedColor[name] ? Color.getRandom() : Color.predefinedColor[name];
    }

    static getRandom() {
        return new Color(
            Math.floor( Math.random()*255),
            Math.floor( Math.random()*255),
            Math.floor( Math.random()*255)
        );
    }

    static predefinedColor = {
        "white": new Color(255, 255, 255),
        "black": new Color(0, 0, 0,)
    }
}
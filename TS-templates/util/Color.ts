export default class Color {
    r: number;
    g: number;
    b: number;

    constructor(r: number, g: number, b: number) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    getRGB(): string {
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }

    static get(name: string): Color {
        if(!this.predefinedColor[name]) return Color.getRandom();
        return this.predefinedColor[name];
    }

    static getRandom(): Color {
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
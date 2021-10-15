export default class Color {
    color = {
        r: null,
        g: null,
        b: null
    }

    /**
     * @param {number} r
     * @param {number} g
     * @param {number} b
     */
    constructor(r, g, b) {
        this.color = {
            r: r,
            g: g,
            b: b
        };
    }

    getRGB() {
        return `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`; 
    }

    static random() {
        return new Color(
            Math.floor( Math.random()*255),
            Math.floor( Math.random()*255),
            Math.floor( Math.random()*255)
        )
    }

    static convertRGBToColor(rgb) {
        let number = /\d+/g;
        let found = rgb.match(number);
        if(found.length === 3) {
            return new Color(found[0], found[1], found[2]);
        }
        return Color.random();
    }
}
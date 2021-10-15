export default class Color {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    getRGB() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }

    static getRandomRGB() {
        return new Color(
            Math.floor( Math.random()*255), 
            Math.floor( Math.random()*255), 
            Math.floor( Math.random()*255)
        );
    }

    static usedColors = new Array();

    static getRandomPlayerColor() {
        if(this.usedColors.length == this.playerColors.length) return this.getRandomRGB();

        let color;
        while(color == null | undefined || this.usedColors.includes(color)) {
            color = this.playerColors[Math.floor( Math.random()*this.playerColors.length)];
        }
        this.usedColors.push(color);
        return color;
    }

    static playerColors = [
        new Color(255, 0, 0),
        new Color(255, 255, 0),
        new Color(255, 0, 255),
        new Color(0, 255, 0),
        new Color(0, 255, 255),
        new Color(0, 0, 255),
    ]
}
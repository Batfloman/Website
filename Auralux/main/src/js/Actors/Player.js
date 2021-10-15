import Color from "../util/Color.js";

export default class Player {
    color;

    constructor(color) {
        if(color instanceof Color) this.color = color;
        else this.color = Color.getRandomPlayerColor();
    }

    getColor() {
        return this.color;
    }
}
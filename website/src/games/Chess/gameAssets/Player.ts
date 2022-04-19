import Color from "../util/Color.js";

export default class Player {
    /** @param {Color} color  */
    constructor(color) {
        this.color = color;
    }

    getColor() {
        return this.color.getName();
    }
}
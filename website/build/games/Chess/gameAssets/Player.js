export default class Player {
    constructor(color) {
        this.color = color;
    }
    getColor() {
        return this.color.getName();
    }
}

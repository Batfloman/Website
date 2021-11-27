import Vector2f from "../../../../templates/util/Vector2f.js";
import GridObject from "../../../../templates/gameAssets/impl/GridObject.js";

export default class GameBoard extends GridObject {
    constructor(x, y) {
        super(
            new Vector2f(x, y),
            new Vector2f(100, 100),
            new Vector2f(0, 0)
        )
    }

    render() {
        super.render();

        for(let arr of this.cells) {
            for(let symbol of arr) {
                if(symbol != "[]") {
                    // console.log(symbol)
                }
            }
        }
    }
}
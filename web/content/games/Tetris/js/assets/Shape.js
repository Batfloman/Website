import Vector2 from "../../../../lib/util/Vector2.js";
import Block from "./Block.js";
import Util from "../../../../lib/util/Util.js";
const forms = new Map([
    ["square", [new Vector2(), new Vector2(1, 0), new Vector2(-1, 0), new Vector2(-1, 1)]],
    ["t-shape", [new Vector2(), new Vector2(-1, 0), new Vector2(1, 0), new Vector2(0, -1)]],
    ["l-shape", [new Vector2(), new Vector2(-1, 0), new Vector2(-1, -1), new Vector2(1, 0)]],
    ["l-reverse", [new Vector2(), new Vector2(-1, 0), new Vector2(1, 0), new Vector2(1, -1)]],
    ["z-shape", [new Vector2(), new Vector2(-1, 0), new Vector2(0, -1), new Vector2(1, -1)]],
    ["z-reverse", [new Vector2(), new Vector2(1, 0), new Vector2(0, -1), new Vector2(-1, -1)]],
    ["line", [new Vector2(), new Vector2(0, 1), new Vector2(0, -1), new Vector2(0, -2)]],
]);
export default class Shape {
    constructor(form, gridPos = new Vector2()) {
        this.blocks = [];
        const positions = forms.get(form);
        if (!positions)
            return;
        let first = true;
        for (let pos of positions) {
            const block = new Block();
            block.gridPos = gridPos.add(pos);
            this.blocks.push(block);
            if (first) {
                this.center = block;
                first = false;
            }
        }
        console.log(this.blocks);
    }
    static getRandom() {
        const form = Util.array.getRandomItem(Array.from(forms.keys()));
        return new Shape(form);
    }
}

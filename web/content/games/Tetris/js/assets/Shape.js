import { Vector2 } from "../../../../lib/util/Vector2.js";
import { Block } from "./Block.js";
import { Util } from "../../../../lib/util/Util.js";
import { ControllableObject } from "../../../../lib/assets/objects/ControllableObject.js";
import { Rectangle } from "../../../../lib/physic/boundingBox/Rectangle.js";
const forms = new Map([
    ["square", [new Vector2(), new Vector2(1, 0), new Vector2(-1, 0), new Vector2(-1, 1)]],
    ["t-shape", [new Vector2(), new Vector2(-1, 0), new Vector2(1, 0), new Vector2(0, -1)]],
    ["l-shape", [new Vector2(), new Vector2(-1, 0), new Vector2(-1, -1), new Vector2(1, 0)]],
    ["l-reverse", [new Vector2(), new Vector2(-1, 0), new Vector2(1, 0), new Vector2(1, -1)]],
    ["z-shape", [new Vector2(), new Vector2(-1, 0), new Vector2(0, -1), new Vector2(1, -1)]],
    ["z-reverse", [new Vector2(), new Vector2(1, 0), new Vector2(0, -1), new Vector2(-1, -1)]],
    ["line", [new Vector2(), new Vector2(0, 1), new Vector2(0, -1), new Vector2(0, -2)]],
]);
export class Shape extends ControllableObject {
    constructor(form, gridPos = new Vector2()) {
        super(new Vector2(), new Rectangle(10, 10));
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
    update2(dt) {
        throw new Error("Method not implemented.");
    }
    render(renderer) {
        throw new Error("Method not implemented.");
    }
    static getRandom() {
        const form = Util.array.getRandomItem(Array.from(forms.keys()));
        return new Shape(form);
    }
}

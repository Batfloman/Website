import { Vector2 } from "../../../../lib/util/Vector2.js";
import { Block } from "./Block.js";
import { Util } from "../../../../lib/util/Util.js";
import { ControllableObject } from "../../../../lib/assets/objects/ControllableObject.js";
import { Rectangle } from "../../../../lib/physic/boundingBox/Rectangle.js";
import { Input } from "../../../../lib/input/Input.js";
const forms = new Map([
    ["square", [new Vector2(), new Vector2(1, 0), new Vector2(-1, 0), new Vector2(-1, 1)]],
    ["t-shape", [new Vector2(), new Vector2(-1, 0), new Vector2(1, 0), new Vector2(0, -1)]],
    ["l-shape", [new Vector2(), new Vector2(-1, 0), new Vector2(-1, -1), new Vector2(1, 0)]],
    ["l-reverse", [new Vector2(), new Vector2(-1, 0), new Vector2(1, 0), new Vector2(1, -1)]],
    ["z-shape", [new Vector2(), new Vector2(-1, 0), new Vector2(0, -1), new Vector2(1, -1)]],
    ["z-reverse", [new Vector2(), new Vector2(1, 0), new Vector2(0, -1), new Vector2(-1, -1)]],
    ["line", [new Vector2(), new Vector2(0, 1), new Vector2(0, -1), new Vector2(0, -2)]],
]);
const timeBetweenMoveDown = 333;
export class Shape extends ControllableObject {
    constructor(form, gridPos = new Vector2()) {
        super(new Vector2(), new Rectangle(10, 10));
        this.blocks = [];
        this.timeSinceLastMoveDown = 0;
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
        Input.newEventListener("wheel", this, (event) => {
            if (event.deltaY == 0)
                return;
            const direction = event.deltaY > 0 ? "down" : "up";
            if (direction == "up") {
            }
            else {
            }
        });
        this.controlles.set("a", () => {
            for (let block of this.blocks) {
                block.moveInGrid(-1, 0);
            }
        });
        this.controlles.set("d", () => {
            for (let block of this.blocks) {
                block.moveInGrid(1, 0);
            }
        });
    }
    update2(dt) {
        this.timeSinceLastMoveDown += dt;
        if (this.timeSinceLastMoveDown > timeBetweenMoveDown) {
            this.timeSinceLastMoveDown = 0;
            for (let block of this.blocks) {
                block.moveInGrid(0, -1);
            }
        }
    }
    render(renderer) {
        for (let block of this.blocks) {
            block.render(renderer);
        }
    }
    setGrid(grid) {
        for (let block of this.blocks) {
            block.setGrid(grid);
        }
    }
    static getRandom() {
        const form = Util.array.getRandomItem(Array.from(forms.keys()));
        return new Shape(form);
    }
}

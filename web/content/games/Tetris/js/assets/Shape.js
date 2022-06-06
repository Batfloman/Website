import { Vector2 } from "../../../../lib/util/Vector2.js";
import { Block } from "./Block.js";
import { Util } from "../../../../lib/util/Util.js";
import { ControllableObject } from "../../../../lib/assets/objects/ControllableObject.js";
import { Rectangle } from "../../../../lib/physic/boundingBox/Rectangle.js";
import { Input } from "../../../../lib/input/Input.js";
import { Color } from "../../../../lib/util/Color.js";
const timeBetweenMoveDown = 500;
const forms = new Map([
    ["square", [new Vector2(), new Vector2(1, 0), new Vector2(1, 1), new Vector2(0, 1)]],
    ["t-shape", [new Vector2(), new Vector2(-1, 0), new Vector2(1, 0), new Vector2(0, -1)]],
    ["l-shape", [new Vector2(), new Vector2(-1, 0), new Vector2(-1, -1), new Vector2(1, 0)]],
    ["l-reverse", [new Vector2(), new Vector2(-1, 0), new Vector2(1, 0), new Vector2(1, -1)]],
    ["z-shape", [new Vector2(), new Vector2(-1, 0), new Vector2(0, -1), new Vector2(1, -1)]],
    ["z-reverse", [new Vector2(), new Vector2(1, 0), new Vector2(0, -1), new Vector2(-1, -1)]],
    ["line", [new Vector2(), new Vector2(0, 1), new Vector2(0, -1), new Vector2(0, -2)]],
]);
const shapes = new Map([
    [
        "square",
        {
            center: new Vector2(0.5, -0.5),
            blocksModell: [new Vector2(), new Vector2(1, 0), new Vector2(1, -1), new Vector2(0, -1)],
            color: Color.get("yellow"),
        },
    ],
    [
        "t-shape",
        {
            center: new Vector2(),
            blocksModell: [new Vector2(), new Vector2(-1, 0), new Vector2(1, 0), new Vector2(0, -1)],
            color: Color.get("violet"),
        },
    ],
    [
        "l-shape",
        {
            center: new Vector2(),
            blocksModell: [new Vector2(), new Vector2(-1, 0), new Vector2(-1, -1), new Vector2(1, 0)],
            color: Color.get("blue"),
        },
    ],
    [
        "l-reverse",
        {
            center: new Vector2(),
            blocksModell: [new Vector2(), new Vector2(-1, 0), new Vector2(1, 0), new Vector2(1, -1)],
            color: Color.get("orange"),
        },
    ],
    [
        "z-shape",
        {
            center: new Vector2(),
            blocksModell: [new Vector2(), new Vector2(-1, 0), new Vector2(0, -1), new Vector2(1, -1)],
            color: Color.get("red"),
        },
    ],
    [
        "line",
        {
            center: new Vector2(0.5, -1.5),
            blocksModell: [new Vector2(), new Vector2(0, -1), new Vector2(0, -2), new Vector2(0, -3)],
            color: Color.get("lightblue"),
        },
    ],
]);
export class Shape extends ControllableObject {
    constructor(layout, gridPos = new Vector2()) {
        super(new Vector2(), new Rectangle(10, 10));
        this.blocks = [];
        this.timeSinceLastMoveDown = 0;
        this.center = layout.center.add(gridPos);
        for (let blockPosition of layout.blocksModell) {
            const block = new Block();
            block.gridPos = gridPos.add(blockPosition);
            block.color = layout.color;
            this.blocks.push(block);
        }
        Input.newEventListener("wheel", this, (event) => {
            if (event.deltaY == 0)
                return;
            event.deltaY > 0
                ? this.rotateDirection("counterclockwise")
                : this.rotateDirection("clockwise");
        });
        this.addControll("a", (dt) => {
            this.moveBlocks(-1, 0);
        }, 100);
        this.addControll("d", (dt) => {
            this.moveBlocks(1, 0);
        }, 100);
        this.addControll("s", (dt) => {
            this.moveBlocks(0, -1);
        }, 100);
        this.addControll("q", () => {
            this.rotateDirection("clockwise");
        }, 150);
        this.addControll("e", () => {
            this.rotateDirection("counterclockwise");
        }, 150);
    }
    rotateDirection(direction) {
        for (let block of this.blocks) {
            block.gridPos = Util.rotateAroundCenter(this.center, block.gridPos, direction == "clockwise" ? 90 : -90);
            block.gridPos.x = Math.round(block.gridPos.x);
            block.gridPos.y = Math.round(block.gridPos.y);
        }
    }
    testMove(x, y) {
        for (let block of this.blocks) {
            if (!block.testMoveInGrid(x, y))
                return false;
        }
        return true;
    }
    testMoveDown() {
        for (let block of this.blocks) {
            if (!block.testMoveInGrid(0, -1))
                return false;
        }
        return true;
    }
    moveBlocks(x, y) {
        if (!this.testMove(x, y))
            return;
        this.center = this.center.add(new Vector2(x, y));
        for (let block of this.blocks) {
            block.moveInGrid(x, y);
        }
    }
    update2(dt) {
        this.timeSinceLastMoveDown += dt;
        if (this.timeSinceLastMoveDown > timeBetweenMoveDown) {
            if (this.testMoveDown()) {
                this.timeSinceLastMoveDown = 0;
                this.moveBlocks(0, -1);
                return;
            }
            if (this.timeSinceLastMoveDown > timeBetweenMoveDown * 2) {
                this.game.removeObject(this);
                Input.removeEventListener("wheel", this);
                for (let block of this.blocks) {
                    this.game.addObject(block);
                }
                this.game.newCurrentShape();
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
    static getRandom(gridPos = new Vector2()) {
        const form = Util.array.getRandomItem(Array.from(shapes.keys()));
        const layout = shapes.get(form);
        if (!layout)
            throw new Error("layout not found for" + form);
        return new Shape(layout, gridPos);
    }
}

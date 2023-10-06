"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shape = void 0;
const Vector2_js_1 = require("../../../../lib/util/Vector2.js");
const Block_js_1 = require("./Block.js");
const Util_js_1 = require("../../../../lib/util/Util.js");
const ControllableObject_js_1 = require("../../../../lib/assets/objects/ControllableObject.js");
const Rectangle_js_1 = require("../../../../lib/physic/boundingBox/Rectangle.js");
const Input_js_1 = require("../../../../lib/input/Input.js");
const Color_js_1 = require("../../../../lib/util/Color.js");
const timeBetweenMoveDown = 500;
const forms = new Map([
    ["square", [new Vector2_js_1.Vector2(), new Vector2_js_1.Vector2(1, 0), new Vector2_js_1.Vector2(1, 1), new Vector2_js_1.Vector2(0, 1)]],
    ["t-shape", [new Vector2_js_1.Vector2(), new Vector2_js_1.Vector2(-1, 0), new Vector2_js_1.Vector2(1, 0), new Vector2_js_1.Vector2(0, -1)]],
    ["l-shape", [new Vector2_js_1.Vector2(), new Vector2_js_1.Vector2(-1, 0), new Vector2_js_1.Vector2(-1, -1), new Vector2_js_1.Vector2(1, 0)]],
    ["l-reverse", [new Vector2_js_1.Vector2(), new Vector2_js_1.Vector2(-1, 0), new Vector2_js_1.Vector2(1, 0), new Vector2_js_1.Vector2(1, -1)]],
    ["z-shape", [new Vector2_js_1.Vector2(), new Vector2_js_1.Vector2(-1, 0), new Vector2_js_1.Vector2(0, -1), new Vector2_js_1.Vector2(1, -1)]],
    ["z-reverse", [new Vector2_js_1.Vector2(), new Vector2_js_1.Vector2(1, 0), new Vector2_js_1.Vector2(0, -1), new Vector2_js_1.Vector2(-1, -1)]],
    ["line", [new Vector2_js_1.Vector2(), new Vector2_js_1.Vector2(0, 1), new Vector2_js_1.Vector2(0, -1), new Vector2_js_1.Vector2(0, -2)]],
]);
const shapes = new Map([
    [
        "square",
        {
            center: new Vector2_js_1.Vector2(0.5, -0.5),
            blocksModell: [new Vector2_js_1.Vector2(), new Vector2_js_1.Vector2(1, 0), new Vector2_js_1.Vector2(1, -1), new Vector2_js_1.Vector2(0, -1)],
            color: Color_js_1.Color.get("yellow"),
        },
    ],
    [
        "t-shape",
        {
            center: new Vector2_js_1.Vector2(),
            blocksModell: [new Vector2_js_1.Vector2(), new Vector2_js_1.Vector2(-1, 0), new Vector2_js_1.Vector2(1, 0), new Vector2_js_1.Vector2(0, -1)],
            color: Color_js_1.Color.get("blueviolet"),
        },
    ],
    [
        "l-shape",
        {
            center: new Vector2_js_1.Vector2(),
            blocksModell: [new Vector2_js_1.Vector2(), new Vector2_js_1.Vector2(-1, 0), new Vector2_js_1.Vector2(-1, -1), new Vector2_js_1.Vector2(1, 0)],
            color: Color_js_1.Color.get("blue"),
        },
    ],
    [
        "l-reverse",
        {
            center: new Vector2_js_1.Vector2(),
            blocksModell: [new Vector2_js_1.Vector2(), new Vector2_js_1.Vector2(-1, 0), new Vector2_js_1.Vector2(1, 0), new Vector2_js_1.Vector2(1, -1)],
            color: Color_js_1.Color.get("orange"),
        },
    ],
    [
        "z-shape",
        {
            center: new Vector2_js_1.Vector2(),
            blocksModell: [new Vector2_js_1.Vector2(), new Vector2_js_1.Vector2(-1, 0), new Vector2_js_1.Vector2(0, -1), new Vector2_js_1.Vector2(1, -1)],
            color: Color_js_1.Color.get("red"),
        },
    ],
    [
        "z-reverse",
        {
            center: new Vector2_js_1.Vector2(),
            blocksModell: [new Vector2_js_1.Vector2(), new Vector2_js_1.Vector2(1, 0), new Vector2_js_1.Vector2(0, -1), new Vector2_js_1.Vector2(-1, -1)],
            color: Color_js_1.Color.get("palegreen"),
        },
    ],
    [
        "line",
        {
            center: new Vector2_js_1.Vector2(0.5, -1.5),
            blocksModell: [new Vector2_js_1.Vector2(), new Vector2_js_1.Vector2(0, -1), new Vector2_js_1.Vector2(0, -2), new Vector2_js_1.Vector2(0, -3)],
            color: Color_js_1.Color.get("aqua"),
        },
    ],
]);
class Shape extends ControllableObject_js_1.ControllableObject {
    constructor(layout, gridPos = new Vector2_js_1.Vector2()) {
        super(new Vector2_js_1.Vector2(), new Rectangle_js_1.Rectangle(10, 10));
        this.blocks = [];
        // ==========================================================================================
        // #region gametick
        this.timeSinceLastMoveDown = 0;
        this.center = layout.center.add(gridPos);
        for (let blockPosition of layout.blocksModell) {
            const block = new Block_js_1.Block();
            block.gridPos = gridPos.add(blockPosition);
            block.color = layout.color;
            this.blocks.push(block);
        }
        // ==========================================================================================
        // #region controlles
        Input_js_1.Input.newEventListener("wheel", this, (event) => {
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
        //#endregion
    }
    rotateDirection(direction) {
        for (let block of this.blocks) {
            block.gridPos = Util_js_1.Util.rotateAroundCenter(this.center, block.gridPos, direction == "clockwise" ? 90 : -90);
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
        this.center = this.center.add(new Vector2_js_1.Vector2(x, y));
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
                Input_js_1.Input.removeEventListener("wheel", this);
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
    //#endregion
    // ==========================================================================================
    setGrid(grid) {
        for (let block of this.blocks) {
            block.setGrid(grid);
        }
    }
    static getRandom(gridPos = new Vector2_js_1.Vector2()) {
        const form = Util_js_1.Util.array.getRandomItem(Array.from(shapes.keys()));
        const layout = shapes.get(form);
        if (!layout)
            throw new Error("layout not found for" + form);
        return new Shape(layout, gridPos);
    }
}
exports.Shape = Shape;

import { Vector2 } from "../../../../lib/util/Vector2.js";
import { Block } from "./Block.js";
import { Util } from "../../../../lib/util/Util.js";
import { ControllableObject } from "../../../../lib/assets/objects/ControllableObject.js";
import { Rectangle } from "../../../../lib/physic/boundingBox/Rectangle.js";
import { Renderer } from "../../../../lib/display/Renderer.js";
import { TetrisGrid } from "./TetrisGrid.js";
import { Input } from "../../../../lib/input/Input.js";
import { Color } from "../../../../lib/util/Color.js";
import { TetrisGame } from "./TetrisGame.js";

const timeBetweenMoveDown = 500;
type rotateDirection = "clockwise" | "counterclockwise";

const forms = new Map<Forms, Vector2[]>([
  ["square", [new Vector2(), new Vector2(1, 0), new Vector2(1, 1), new Vector2(0, 1)]],
  ["t-shape", [new Vector2(), new Vector2(-1, 0), new Vector2(1, 0), new Vector2(0, -1)]],
  ["l-shape", [new Vector2(), new Vector2(-1, 0), new Vector2(-1, -1), new Vector2(1, 0)]],
  ["l-reverse", [new Vector2(), new Vector2(-1, 0), new Vector2(1, 0), new Vector2(1, -1)]],
  ["z-shape", [new Vector2(), new Vector2(-1, 0), new Vector2(0, -1), new Vector2(1, -1)]],
  ["z-reverse", [new Vector2(), new Vector2(1, 0), new Vector2(0, -1), new Vector2(-1, -1)]],
  ["line", [new Vector2(), new Vector2(0, 1), new Vector2(0, -1), new Vector2(0, -2)]],
]);

type Forms = "square" | "t-shape" | "l-shape" | "l-reverse" | "z-shape" | "z-reverse" | "line";

interface shapeLayout {
  center: Vector2;
  blocksModell: Vector2[];
  color: Color;
}

const shapes = new Map<Forms, shapeLayout>([
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
      color: Color.get("blueviolet"),
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
    "z-reverse",
    {
      center: new Vector2(),
      blocksModell: [new Vector2(), new Vector2(1, 0), new Vector2(0, -1), new Vector2(-1, -1)],
      color: Color.get("palegreen"),
    },
  ],
  [
    "line",
    {
      center: new Vector2(0.5, -1.5),
      blocksModell: [new Vector2(), new Vector2(0, -1), new Vector2(0, -2), new Vector2(0, -3)],
      color: Color.get("aqua"),
    },
  ],
]);

export class Shape extends ControllableObject<Rectangle> {
  center: Vector2;
  blocks: Block[] = [];

  constructor(layout: shapeLayout, gridPos: Vector2 = new Vector2()) {
    super(new Vector2(), new Rectangle(10, 10));

    this.center = layout.center.add(gridPos);

    for (let blockPosition of layout.blocksModell) {
      const block = new Block();
      block.gridPos = gridPos.add(blockPosition);
      block.color = layout.color;
      this.blocks.push(block);
    }

    // ==========================================================================================
    // #region controlles

    Input.newEventListener("wheel", this, (event: WheelEvent) => {
      if (event.deltaY == 0) return;

      event.deltaY > 0
        ? this.rotateDirection("counterclockwise")
        : this.rotateDirection("clockwise");
    });

    this.addControll(
      "a",
      (dt: number) => {
        this.moveBlocks(-1, 0);
      },
      100
    );
    this.addControll(
      "d",
      (dt: number) => {
        this.moveBlocks(1, 0);
      },
      100
    );
    this.addControll(
      "s",
      (dt: number) => {
        this.moveBlocks(0, -1);
      },
      100
    );
    this.addControll(
      "q",
      () => {
        this.rotateDirection("clockwise");
      },
      150
    );
    this.addControll(
      "e",
      () => {
        this.rotateDirection("counterclockwise");
      },
      150
    );

    //#endregion
  }

  rotateDirection(direction: rotateDirection) {
    for (let block of this.blocks) {
      block.gridPos = Util.rotateAroundCenter(
        this.center,
        block.gridPos,
        direction == "clockwise" ? 90 : -90
      );

      block.gridPos.x = Math.round(block.gridPos.x);
      block.gridPos.y = Math.round(block.gridPos.y);
    }
  }

  testMove(x: number, y: number): boolean {
    for (let block of this.blocks) {
      if (!block.testMoveInGrid(x, y)) return false;
    }
    return true;
  }

  testMoveDown(): boolean {
    for (let block of this.blocks) {
      if (!block.testMoveInGrid(0, -1)) return false;
    }
    return true;
  }

  moveBlocks(x: number, y: number): void {
    if (!this.testMove(x, y)) return;

    this.center = this.center.add(new Vector2(x, y));
    for (let block of this.blocks) {
      block.moveInGrid(x, y);
    }
  }

  // ==========================================================================================
  // #region gametick

  timeSinceLastMoveDown = 0;
  update2(dt: number): void {
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
        (this.game as TetrisGame).newCurrentShape();
      }
    }
  }
  render(renderer: Renderer): void {
    for (let block of this.blocks) {
      block.render(renderer);
    }
  }

  //#endregion

  // ==========================================================================================

  setGrid(grid: TetrisGrid) {
    for (let block of this.blocks) {
      block.setGrid(grid);
    }
  }

  static getRandom(gridPos: Vector2 = new Vector2()): Shape {
    const form = Util.array.getRandomItem(Array.from(shapes.keys()));
    const layout = shapes.get(form);
    if (!layout) throw new Error("layout not found for" + form);
    return new Shape(layout, gridPos);
  }
}

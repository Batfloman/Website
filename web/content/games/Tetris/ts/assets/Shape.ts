import { Vector2 } from "../../../../lib/util/Vector2.js";
import { Block } from "./Block.js";
import { Util } from "../../../../lib/util/Util.js";
import { ControllableObject } from "../../../../lib/assets/objects/ControllableObject.js";
import { Rectangle } from "../../../../lib/physic/boundingBox/Rectangle.js";
import { Renderer } from "../../../../lib/display/Renderer.js";
import { TetrisGrid } from "./TetrisGrid.js";
import { Input } from "../../../../lib/input/Input.js";

type Forms = "square" | "t-shape" | "l-shape" | "l-reverse" | "z-shape" | "z-reverse" | "line";
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

const timeBetweenMoveDown = 500;

export class Shape extends ControllableObject<Rectangle> {
  center!: Block;
  blocks: Block[] = [];

  constructor(form: Forms, gridPos: Vector2 = new Vector2()) {
    super(new Vector2(), new Rectangle(10, 10));
    const positions = forms.get(form);
    if (!positions) return;

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
        for (let block of this.blocks) {
          block.moveInGrid(-1, 0);
        }
      },
      100
    );
    this.addControll(
      "d",
      (dt: number) => {
        for (let block of this.blocks) {
          block.moveInGrid(1, 0);
        }
      },
      100
    );
    this.addControll(
      "s",
      (dt: number) => {
        for (let block of this.blocks) {
          block.moveInGrid(0, -1);
        }
      },
      100
    );
    this.addControll("q", () => {
      this.rotateDirection("clockwise");
    }, 150);
    this.addControll("e", () => {
      this.rotateDirection("counterclockwise");
    }, 150);

    //#endregion
  }

  rotateDirection(direction: rotateDirection) {
    for (let block of this.blocks) {
      if (block == this.center) continue;

      block.gridPos = Util.rotateAroundCenter(
        this.center.gridPos,
        block.gridPos,
        direction == "clockwise" ? 90 : -90
      );
    }
  }

  // ==========================================================================================
  // #region gametick

  timeSinceLastMoveDown = 0;
  update2(dt: number): void {
    this.timeSinceLastMoveDown += dt;

    if (this.timeSinceLastMoveDown > timeBetweenMoveDown) {
      this.timeSinceLastMoveDown = 0;
      for (let block of this.blocks) {
        block.moveInGrid(0, -1);
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

  static getRandom(): Shape {
    const form = Util.array.getRandomItem(Array.from(forms.keys()));
    console.log(form);
    return new Shape(form);
  }
}

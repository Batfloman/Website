import Vector2f from "./Vector2f";

export default class Input {
    static mousePos: Vector2f;

    static {
        window.addEventListener("mousemove", (event) => {
            //TODO update Mouse Pos
        });
    }
}
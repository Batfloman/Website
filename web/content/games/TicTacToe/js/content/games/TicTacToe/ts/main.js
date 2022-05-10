import TurnBasedGame from "../../../../../lib/games/TurnBasedGame.js";
import Canvas from "../../../../../lib/display/Canvas.js";
import { SceneObject } from "../../../../../lib/assets/SceneObject.js";
window.onload = () => {
    const canvas = new Canvas(document.querySelector("canvas"));
    const game = new TurnBasedGame(canvas);
    game.findObjects(SceneObject);
};

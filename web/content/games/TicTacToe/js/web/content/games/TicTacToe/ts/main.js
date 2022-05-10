import TurnBasedGame from "../../../../../lib/games/TurnBasedGame.js";
import Canvas from "";
import { SceneObject } from "";
window.onload = () => {
    const canvas = new Canvas(document.querySelector("canvas"));
    const game = new TurnBasedGame(canvas);
    game.findObjects(SceneObject);
};

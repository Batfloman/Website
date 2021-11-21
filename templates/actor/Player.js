import Input from "../input/Input.js";
import Actor from "./Actor.js";

export default class Player extends Actor {
    init(game) {
        this.game = game;
        this.input = new Input(this.game.getCanvas());
        this.input.addMouseListener(this, this.mouseInput);
    }

    mouseInput(event) {}
}
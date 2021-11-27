import IMouseListener from "./../input/IMouseListener";
import Input from "./../input/Input";
import Actor from "./Actor";

export default class Player extends Actor implements IMouseListener {
    input: Input;
    
    init(game) {
        super.init(game);
        
        this.input = new Input(this.game.getCanvas());
        this.input.addMouseListener(this);
    }

    mouseInput(event: Event): void {
        throw new Error("Method not implemented.");
    }
}
import Game from "../Game";

export default class SceneObject {
    game: Game;
    canvas: HTMLCanvasElement;
    
    init(game: Game): void {
        this.game = game;
        this.canvas = game.getCanvas();
    }

    update(dt: number): void { return;}
    render(): void { return;}
}
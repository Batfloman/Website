import Game from "./../Game";

export default class Actor {
    game: Game;
    isMyTurn: boolean;

    init(game: Game): void {
        this.game = game;

        this.isMyTurn = false;
    }

    yourTurn(): void {
        this.isMyTurn = true;
    }

    endTurn(): void {
        this.isMyTurn = false;
    }
}
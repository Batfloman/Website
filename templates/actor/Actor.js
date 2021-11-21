export default class Actor {
    game;
    isMyTurn;

    init(game) {
        this.game = game;
    }

    yourTurn() {
        this.isMyTurn = true;
    }

    endTurn() {
        this.isMyTurn = false;
    }
}
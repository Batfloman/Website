export default class Actor {
    game;
    isMyTurn = false;

    init(game) { this.game = game;}

    yourTurn() { this.isMyTurn = true;}

    endTurn() { this.isMyTurn = false;}
}
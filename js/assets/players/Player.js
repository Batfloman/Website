export class Player {
    static counter = 0;
    game;
    name;
    constructor(name) {
        if (!name)
            name = "Player" + Player.counter++;
        this.name = name;
    }
    init(game) {
        this.game = game;
    }
}

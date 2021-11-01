import Options from "../game/Options.js";
import Sun from "../gameassets/Sun.js";

export default class Map {
    name;

    constructor(game , name, players, suns) {
        this.name = name;
        let xSum = 0;
        let ySum = 0;
        suns.forEach(sun => {
            let sunLevel = sun[3] == null | undefined || sun[3] <= 0 ? 1 : sun[3];
            game.addObject( new Sun(players[sun[2]-1], sun[0], sun[1], sunLevel), 2);
            xSum += sun[0];
            ySum += sun[1];
        });

        Options.mouseOffSetX = -xSum / suns.length;
        Options.mouseOffSetY = -ySum / suns.length;
    }
}
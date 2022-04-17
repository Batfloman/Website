import ImageLoader from "../loader/ImageLoader.js";
import Vector2f from "../util/Vector2f.js";
import Player from "./Player.js";

export default class Piece {
    /** @type {String[]} */
    static imageNames;
    /** @type {Map} */
    static images = new Map();
    
    /** @type {Vector2f} */
    pos;
    /** @type {Player} */
    player;
    /** @type {Image} */
    img = new Image();
    

    constructor(player, x, y) {
        this.pos = new Vector2f(x, y);
        this.player = player;
    }

    render(canvas) {
        if(!this.img) return;

        let ctx = canvas.getContext('2d');

        let w = canvas.width / 8;
        let h = canvas.height / 8;
        
        this.img.width = w;
        this.img.height = h;

        ctx.drawImage(this.img, this.pos.x * w, (7-this.pos.y) * h, w, h);
    }

    update() {
        this.showMoves();
    }

    getPos() {
        return this.pos;
    }

    /** @param {Vector2f} pos - pos */
    setPos(pos) {
        if(!pos) return;
        this.pos = pos;
    }

    showMoves() { return;}

    static async loadImages() {
        if(!this.imageNames) return;

        await Promise.all(this.imageNames.map(async (imageName) => {
            let key = imageName.split("_")[0];
            let img = await ImageLoader.loadImage(imageName);
            this.images.set(key, img);
        })) 
    }
}
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ImageLoader from "../loader/ImageLoader.js";
import Vector2f from "../util/Vector2f.js";
export default class Piece {
    constructor(player, x, y) {
        this.img = new Image();
        this.pos = new Vector2f(x, y);
        this.player = player;
    }
    render(canvas) {
        if (!this.img)
            return;
        let ctx = canvas.getContext('2d');
        let w = canvas.width / 8;
        let h = canvas.height / 8;
        this.img.width = w;
        this.img.height = h;
        ctx.drawImage(this.img, this.pos.x * w, (7 - this.pos.y) * h, w, h);
    }
    update() {
        this.showMoves();
    }
    getPos() {
        return this.pos;
    }
    setPos(pos) {
        if (!pos)
            return;
        this.pos = pos;
    }
    showMoves() { return; }
    static loadImages() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.imageNames)
                return;
            yield Promise.all(this.imageNames.map((imageName) => __awaiter(this, void 0, void 0, function* () {
                let key = imageName.split("_")[0];
                let img = yield ImageLoader.loadImage(imageName);
                this.images.set(key, img);
            })));
        });
    }
}
Piece.images = new Map();

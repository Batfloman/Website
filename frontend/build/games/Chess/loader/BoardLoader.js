var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Player from "../gameAssets/Player.js";
import Board from "../gameAssets/Board.js";
import Pawn from "../gameAssets/pieces/Pawn.js";
import Bishop from "../gameAssets/pieces/Bishop.js";
import Queen from "../gameAssets/pieces/Queen.js";
import Rook from "../gameAssets/pieces/Rook.js";
import Color from "../util/Color.js";
import Knight from "../gameAssets/pieces/Knight.js";
import King from "../gameAssets/pieces/King.js";
export default class BoardLoader {
    static loadBoard(name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Bishop.loadImages();
            yield King.loadImages();
            yield Knight.loadImages();
            yield Pawn.loadImages();
            yield Queen.loadImages();
            yield Rook.loadImages();
            let json = yield fetch(`./resources/board_setUp/${name}.json`).then(function (response) { return response.json(); });
            let players = new Array();
            let pieces = new Array();
            for (let key in json) {
                let player = new Player(Color.get(key));
                players.push(player);
                for (let i = 0; i < json[key].length; i++) {
                    let piece = json[key][i];
                    let name = piece[0];
                    let x = piece[1];
                    let y = piece[2];
                    pieces.push(this.createPiece(name, player, x, y));
                }
            }
            return {
                "player": players,
                "pieces": pieces,
                "board": new Board()
            };
        });
    }
    static createPiece(name, player, x, y) {
        switch (name) {
            case "pawn":
                return new Pawn(player, x, y);
            case "rook":
                return new Rook(player, x, y);
            case "knight":
                return new Knight(player, x, y);
            case "bishop":
                return new Bishop(player, x, y);
            case "queen":
                return new Queen(player, x, y);
            case "king":
                return new King(player, x, y);
            default:
                return new Pawn(player, x, y);
        }
    }
}

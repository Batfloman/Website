import CanvasElement from "./CanvasElement";

export default class GameElement {
    canvas: HTMLCanvasElement = document.createElement('canvas');

    init(canvas: HTMLCanvasElement) {this.canvas = canvas;}
    update(dt: number) {return;}
    render() {return;}
}
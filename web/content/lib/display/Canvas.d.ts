export default class Canvas {
    htmlCanvas: HTMLCanvasElement;
    width: number;
    heigh: number;
    constructor(htmlCanvas: HTMLCanvasElement | null);
    updateSize(): void;
}

import Renderer from "./Renderer.js";
export default interface IRenderable {
    render(renderer: Renderer): void;
    shouldRender(): boolean;
}

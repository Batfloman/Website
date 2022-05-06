import Renderer from "./Renderer";
export default interface IRenderable {
    render(renderer: Renderer): void;
    shouldRender(): boolean;
}

import Renderer from "../display/Renderer";
export default interface IRenderable {
    render(renderer: Renderer): void;
    shouldRender(): boolean;
}

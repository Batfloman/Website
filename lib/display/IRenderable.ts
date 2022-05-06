import Vector2 from "../util/Vector2";
import Renderer from "./Renderer";

export default interface IRenderable {
  render(renderer: Renderer): void;
  shouldRender(): boolean;
}
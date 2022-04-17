import SceneObject from "../assets/SceneObject";
import Polygon from "../physic/2d/boundingBox/Polygon";

export default class Scene {
  objects!: SceneObject[];
  form!: Polygon;
}
export abstract class SystemObject {
  abstract update(dt: number): void;
  abstract render(): void;

  abstract shouldUpdate(): boolean;
  abstract shouldRender(): boolean;
}
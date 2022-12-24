export declare abstract class GameObject {
    abstract update(dt: number): void;
    abstract render(): void;
    abstract shouldUpdate(): boolean;
    abstract shouldRender(): boolean;
}

import { HitBox } from "../../physic/boundingBox/HitBox.js";
import { WorldObject } from "../objects/WorldObject.js";
export declare class Chunk {
    objects: WorldObject<HitBox>[];
    keys: {
        x: number;
        y: number;
    };
    constructor(x?: number, y?: number, ...objects: WorldObject<HitBox>[]);
    setKeys(x: number, y: number): void;
    addObject(obj: WorldObject<HitBox>): void;
    removeObject(obj: WorldObject<HitBox>): WorldObject<HitBox> | undefined;
    findObjects<T extends WorldObject<HitBox>>(clas: string | Function, exclude?: T | T[]): T[];
    private objectMap;
    private addToMap;
    private removeFromMap;
}

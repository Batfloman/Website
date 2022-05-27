import Vector2 from "../../util/Vector2.js";
import Util from "../../util/Util.js";
import { Color } from "../../util/Color.js";
import { WorldObject } from "../objects/WorldObject.js";
import { TwoKeyMap } from "../../util/TwoKeyMap.js";
import { Chunk } from "./Chunk.js";
export default class World {
    constructor(pos = new Vector2(), backgroundColor = Color.get("white")) {
        this.objects = [];
        this.objectMap = new Map();
        this.chunkSize = 100;
        this.chunks = new TwoKeyMap();
        this.pos = pos;
        this.backgroundColor = backgroundColor;
    }
    isInsideWorld(point) {
        return true;
    }
    shouldRender() {
        return true;
    }
    render(renderer) {
        renderer.setStrokeColor(this.backgroundColor);
        renderer.setFillColor(this.backgroundColor);
        renderer.renderStaticRectangle("center", "100%", "100%");
    }
    setBackground(color) {
        this.backgroundColor = color;
    }
    addObject(obj) {
        if (this.objects.includes(obj))
            return;
        this.objects.push(obj);
        this.addToMap(obj);
        if (obj instanceof WorldObject)
            this.addToChunks(obj);
        if (obj instanceof WorldObject)
            obj.setWorld(this);
    }
    removeObject(obj) {
        const index = this.objects.indexOf(obj);
        this.removeFromMap(obj);
        return this.objects.splice(index, 1)[0];
    }
    findObjects(clas, exclude) {
        const clasName = clas instanceof Function ? clas.name : clas;
        const objects = this.objectMap.get(clasName);
        if (!objects)
            return [];
        const values = Util.array.copyOf(objects);
        if (exclude instanceof Object && (values === null || values === void 0 ? void 0 : values.includes(exclude))) {
            Util.array.removeItem(values, exclude);
        }
        else if (exclude instanceof Array) {
            for (let ex of exclude) {
                Util.array.removeItem(values, ex);
            }
        }
        return values;
    }
    findObjectsInNeighbouringChunks(chunk, clas, exclude, distance = 1, rectStyle = true) {
        const neighbours = this.findNeighbourChunksOf(chunk, distance, rectStyle);
        let found = [];
        for (let chunk of neighbours) {
            found = found.concat(chunk.findObjects(clas, exclude));
        }
        return found;
    }
    addToMap(obj) {
        let className = Util.object.findClassName(obj);
        let clas = Util.object.findClass(obj);
        do {
            const previousValues = this.objectMap.get(className);
            let values = !previousValues ? [] : previousValues;
            values.push(obj);
            this.objectMap.set(className, values);
            clas = Util.object.findSuperClass(clas);
            className = Util.object.findClassName(clas);
        } while (className != "SceneObject");
    }
    removeFromMap(obj) {
        let className = Util.object.findClassName(obj);
        let clas = Util.object.findClass(obj);
        do {
            const values = this.objectMap.get(obj.constructor.name);
            if (!values)
                continue;
            Util.array.removeItem(values, obj);
            if (Util.array.isEmpty(values))
                this.objectMap.delete(obj.constructor.name);
            clas = Util.object.findSuperClass(clas);
            className = Util.object.findClassName(clas);
        } while (className != "SceneObject");
    }
    putObjectsInCunks() {
        const worldObjects = this.findObjects(WorldObject);
        for (let obj of worldObjects) {
            if (obj.recentlyMoved) {
                this.removeFromChunks(obj);
                this.addToChunks(obj);
            }
        }
    }
    addToChunks(obj) {
        const chunk = this.findChunkOf(obj);
        this.addToChunk(chunk.x, chunk.y, obj);
    }
    removeFromChunks(obj) {
        const chunk = obj.getChunk();
        chunk.removeObject(obj);
        if (!chunk.objects || Util.array.isEmpty(chunk.objects)) {
            this.chunks.delete(chunk.keys.x, chunk.keys.y);
        }
    }
    addToChunk(x, y, obj) {
        let content = this.chunks.get(x, y);
        if (!(content instanceof Chunk)) {
            content = new Chunk(x, y, obj);
            this.chunks.set(x, y, content);
            content.setKeys(x, y);
        }
        content.addObject(obj);
        obj.setChunk(content);
    }
    findChunkOf(obj) {
        return new Vector2(Math.floor(obj.pos.x / this.chunkSize), Math.floor(obj.pos.y / this.chunkSize));
    }
    findNeighbourChunksOf(chunk, distance = 1, rectangleStlye = true) {
        if (!rectangleStlye) {
            console.warn("Circle Style not implemented!");
            return [];
        }
        const found = [];
        if (chunk == undefined)
            console.log(chunk);
        for (let x = -distance + chunk.keys.x; x <= distance + chunk.keys.x; x++) {
            for (let y = -distance + chunk.keys.y; y <= distance + chunk.keys.y; y++) {
                const chunk = this.chunks.get(x, y);
                if (!chunk)
                    continue;
                found.push(chunk);
            }
        }
        return found;
    }
    getChunk(x, y) {
        return this.chunks.get(x, y);
    }
    setChunkSize(size) {
        this.chunkSize = size;
    }
}

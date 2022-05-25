import Vector2 from "../../util/Vector2.js";
import Util from "../../util/Util.js";
import { Color } from "../../util/Color.js";
export default class World {
    constructor(pos = new Vector2(), backgroundColor = Color.get("white")) {
        this.objects = [];
        this.objectMap = new Map();
        this.chunkSize = 100;
        this.chunks = new Map();
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
    }
    removeObject(obj) {
        const index = this.objects.indexOf(obj);
        this.removeFromMap(obj);
        return this.objects.splice(index, 1)[0];
    }
    findObjects(clasName, exclude) {
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
    addToMap(obj) {
        let values = [];
        const arr = this.objectMap.get(obj.constructor.name);
        if (arr)
            values = values.concat(arr);
        values.push(obj);
        this.objectMap.set(obj.constructor.name, values);
    }
    removeFromMap(obj) {
        const values = this.objectMap.get(obj.constructor.name);
        if (!values)
            return;
        Util.array.removeItem(values, obj);
    }
    findChunkOf(obj) {
        console.warn("not implemented!");
        return new Vector2();
    }
    addToChunks(obj) {
        const chunk = this.findChunkOf(obj);
        this.addToChunk(chunk.x, chunk.y, obj);
    }
    addToChunk(x, y, obj) {
        const vec = new Vector2(x, y);
        const content = this.chunks.get(vec);
        if (!content) {
            this.chunks.set(vec, [obj]);
            return;
        }
        if (content.includes(obj))
            return;
        content.push(obj);
    }
    getChunk(x, y) {
        return this.chunks.get(new Vector2(x, y));
    }
    setChunkSize(size) {
        this.chunkSize = this.chunkSize;
    }
}

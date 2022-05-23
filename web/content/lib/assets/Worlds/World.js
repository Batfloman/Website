import Util from "../../util/Util.js";
import { Color } from "../../util/Color.js";
export default class World {
    constructor() {
        this.objects = [];
        this.objectMap = new Map();
        this.backgroundColor = Color.get("white");
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
}

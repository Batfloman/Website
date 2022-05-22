import Util from "../../util/Util.js";
import { Color } from "../../util/Color.js";
export default class World {
    constructor() {
        this.objects = [];
        this.objectMap = new Map();
        this.backgroundColor = new Color(45, 45, 45);
    }
    isInsideWorld(point) {
        return true;
    }
    shouldRender() {
        return true;
    }
    render(renderer) {
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
        const values = this.objectMap.get(clasName);
        if (!values)
            return [];
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

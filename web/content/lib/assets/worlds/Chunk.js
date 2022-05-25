import Util from "../../util/Util.js";
export class Chunk {
    constructor(...objects) {
        this.objects = [];
        this.keys = {
            x: 0,
            y: 0
        };
        this.objectMap = new Map();
        this.objects = objects;
        for (let obj of objects) {
            this.addToMap(obj);
        }
    }
    setKeys(x, y) {
        this.keys.x = x;
        this.keys.y = y;
    }
    addObject(obj) {
        if (this.objects.includes(obj))
            return;
        this.objects.push(obj);
        this.addToMap(obj);
    }
    removeObject(obj) {
        this.removeFromMap(obj);
        return Util.array.removeItem(this.objects, obj);
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

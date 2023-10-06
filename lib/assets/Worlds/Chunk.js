"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chunk = void 0;
const Util_js_1 = require("../../util/Util.js");
class Chunk {
    constructor(x = 0, y = 0, ...objects) {
        this.objects = [];
        this.keys = {
            x: 0,
            y: 0,
        };
        //#endregion
        // ==========================================================================================
        // #region map
        // sorted Objects after class: <className, [Objects]>
        this.objectMap = new Map();
        this.keys.x = x;
        this.keys.y = y;
        this.objects = objects;
        for (let obj of objects) {
            this.addToMap(obj);
        }
    }
    // ==========================================================================================
    // #region objects
    addObject(obj) {
        if (this.objects.includes(obj))
            return;
        this.objects.push(obj);
        this.addToMap(obj);
    }
    removeObject(obj) {
        this.removeFromMap(obj);
        return Util_js_1.Util.array.removeItem(this.objects, obj);
    }
    findObjects(clas, exclude) {
        const clasName = clas instanceof Function ? clas.name : clas;
        const objects = this.objectMap.get(clasName);
        if (!objects)
            return [];
        // copy and work with values
        const values = Util_js_1.Util.array.copyOf(objects);
        if (exclude instanceof Object && (values === null || values === void 0 ? void 0 : values.includes(exclude))) {
            Util_js_1.Util.array.removeItem(values, exclude);
        }
        else if (exclude instanceof Array) {
            for (let ex of exclude) {
                Util_js_1.Util.array.removeItem(values, ex);
            }
        }
        return values;
    }
    addToMap(obj) {
        const classes = Util_js_1.Util.object.findAllClassNames(obj);
        for (let clasz of classes) {
            const previousValues = this.objectMap.get(clasz);
            let values = !previousValues ? [] : previousValues;
            values.push(obj);
            this.objectMap.set(clasz, values);
        }
    }
    removeFromMap(obj) {
        const classes = Util_js_1.Util.object.findAllClassNames(obj);
        for (let clasz of classes) {
            const values = this.objectMap.get(clasz);
            if (!values)
                continue;
            Util_js_1.Util.array.removeItem(values, obj);
            if (Util_js_1.Util.array.isEmpty(values))
                this.objectMap.delete(clasz);
        }
    }
}
exports.Chunk = Chunk;

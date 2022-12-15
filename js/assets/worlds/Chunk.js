import { Util } from "../../util/Util.js";
export class Chunk {
    objects = [];
    keys = {
        x: 0,
        y: 0,
    };
    constructor(x = 0, y = 0, ...objects) {
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
        return Util.array.removeItem(this.objects, obj);
    }
    findObjects(clas, exclude) {
        const clasName = clas instanceof Function ? clas.name : clas;
        const objects = this.objectMap.get(clasName);
        if (!objects)
            return [];
        // copy and work with values
        const values = Util.array.copyOf(objects);
        if (exclude instanceof Object && values?.includes(exclude)) {
            Util.array.removeItem(values, exclude);
        }
        else if (exclude instanceof Array) {
            for (let ex of exclude) {
                Util.array.removeItem(values, ex);
            }
        }
        return values;
    }
    //#endregion
    // ==========================================================================================
    // #region map
    // sorted Objects after class: <className, [Objects]>
    objectMap = new Map();
    addToMap(obj) {
        const classes = Util.object.findAllClassNames(obj);
        for (let clasz of classes) {
            const previousValues = this.objectMap.get(clasz);
            let values = !previousValues ? [] : previousValues;
            values.push(obj);
            this.objectMap.set(clasz, values);
        }
    }
    removeFromMap(obj) {
        const classes = Util.object.findAllClassNames(obj);
        for (let clasz of classes) {
            const values = this.objectMap.get(clasz);
            if (!values)
                continue;
            Util.array.removeItem(values, obj);
            if (Util.array.isEmpty(values))
                this.objectMap.delete(clasz);
        }
    }
}

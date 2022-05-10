export class Game {
    constructor(canvas) {
        this.canvas = canvas;
    }
    addObject(obj) {
        if (this.objects.includes(obj))
            return;
        this.objects.push(obj);
        obj.init(this, this.canvas);
    }
    removeObject(obj) {
        if (!this.objects.includes(obj))
            return;
        let removed = this.objects.splice(this.objects.indexOf(obj), 1);
        return removed[0];
    }
    findObjects(clas, exclude) {
        let found = [];
        this.objects.forEach(obj => {
            if (obj instanceof clas)
                found.push(obj);
        });
        return found;
    }
    start() {
        throw new Error("not Implemented!");
    }
    stop() {
        throw new Error("not Implemented!");
    }
    tick() {
        throw new Error("not Implmented!");
    }
}

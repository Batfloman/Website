export default class Game {
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
        return found;
    }
}

export default class World {
    constructor() {
        this.objects = [];
    }
    isInsideWorld(point) {
        return true;
    }
    addObject(obj) {
        if (this.objects.includes(obj))
            return;
        this.objects.push(obj);
    }
    removeObject(obj) {
        const index = this.objects.indexOf(obj);
        return this.objects.splice(index, 1)[0];
    }
}

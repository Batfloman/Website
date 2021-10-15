export default class GameObject {
    canvas;
    
    init(canvas) { this.canvas = canvas;};
    
    /** @param {number} dt */
    update(dt) {throw new Error("Must be implemented in sub-class")};
    
    render() {throw new Error("Must be implemented in sub-class")};
}
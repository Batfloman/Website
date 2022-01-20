import Window from "./Window.js";

export default class Scene {
    
    window;
    bFullScreen;
    position;

    constructor() {}

    // ===== render =====

    render() {
        console.log(this.window.getSize());
    }

    // ===== getter & setter =====

    setWindow(window) { 
        if(window instanceof Window) this.window = window;
    }
    setFullScreen(b) { this.bFullScreen = b;}
    setPosition(position) { this.position = !Scene.positions[position] ? Scene.positions.center : Scene.positions[position]; console.log(this.position)}

    // ==== enum =====

    static positions = {
        left: "left",
        right: "right",
        center: "center"
    }
}
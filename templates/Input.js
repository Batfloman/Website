const mouseEvents = ["mousedown", "mousemove", "mouseup"];

export default class Input {
    mouseListener = new Array();

    constructor(domObject) {
        if(!domObject) domObject = window;
        console.log(domObject)

        mouseEvents.forEach(event => domObject.addEventListener(event, this.mouseInput));
    }

    addMouseListener(func) {
        this.mouseListener.push(func);
    }

    mouseInput(event) {
        console.log(event);
    }
}
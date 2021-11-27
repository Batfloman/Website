const mouseEvents = ["mousedown", "mousemove", "mouseup"];

export default class Input {
    mouseListener = new Array();

    constructor(domObject) {
        if(!domObject) domObject = window;
        let input = this;
        mouseEvents.forEach(event => domObject.addEventListener(event, function(event) {
            input.mouseInput(event);
        }))
    }

    addMouseListener(obj) {
        this.mouseListener.push(obj);
    }

    mouseInput(event) {
        if(!!this.mouseListener) {
            this.mouseListener.forEach(obj => {
                obj.mouseInput(event);
            })
        }
    }
}
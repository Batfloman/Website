export class Thread {
    constructor(func) {
        var blob = new Blob([`onmessage = ${func.toString()}`]);
        this.blobURL = window.URL.createObjectURL(blob);
        this.worker = new Worker(this.blobURL);
        this.worker.onmessage = function (e) {
            console.log("Received: " + e.data);
        };
        this.postMessage("test");
        this.terminate();
    }
    postMessage(message) {
        this.worker.postMessage(message);
    }
    terminate() {
        this.worker.terminate();
        window.URL.revokeObjectURL(this.blobURL);
    }
}

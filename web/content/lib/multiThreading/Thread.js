export class Thread {
    constructor(func) {
        var blob = new Blob([
            `onmessage = ${func.toString()}`,
        ], { type: "text/javascript" });
        this.blobURL = window.URL.createObjectURL(blob);
        this.worker = new Worker(this.blobURL, { type: "module" });
        this.worker.onmessage = function (e) {
            console.log("Received: " + e.data);
        };
    }
    postMessage(message) {
        this.worker.postMessage(message);
    }
    terminate() {
        this.worker.terminate();
        window.URL.revokeObjectURL(this.blobURL);
    }
}

export class Thread {
    constructor(url, message) {
        this.worker = new Worker(url, { type: "module" });
        if (!message)
            return;
        this.worker.postMessage(message);
    }
    postMessage(message) {
        this.worker.postMessage(message);
    }
}

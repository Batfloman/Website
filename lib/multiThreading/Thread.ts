export class Thread {
  blobURL: string;
  worker: Worker;

  constructor(func: Function) {
    var blob = new Blob([`onmessage = ${func.toString()}`]);

    this.blobURL = window.URL.createObjectURL(blob)

    this.worker = new Worker(this.blobURL);
    this.worker.onmessage = function(e) {
      console.log("Received: " + e.data);
    }
    this.postMessage("test"); // Start the worker.
    this.terminate();
  }

  postMessage(message: string): void {
    this.worker.postMessage(message);
  }

  terminate() {
    this.worker.terminate();
    window.URL.revokeObjectURL(this.blobURL);
  }
}

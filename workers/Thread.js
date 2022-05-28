export class Thread {
  worker;

  constructor(url, message) {
    if (!window.Worker) {
      console.warn("Worker not supported");
      return;
    }

    this.worker = new Worker(url, { type: "module" });

    this.worker.postMessage(message);
  }

  postMessage(message) {
    this.worker.postMessage(message);
  }
}

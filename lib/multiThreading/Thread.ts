export class Thread {
  worker: Worker;

  constructor(url: string, message?: string) {
    this.worker = new Worker(url, { type: "module" });

    if(!message) return;
    this.worker.postMessage(message);
  }

  postMessage(message: string) {
    this.worker.postMessage(message);
  }
}

export declare class Thread {
    worker: Worker;
    constructor(url: string, message?: string);
    postMessage(message: string): void;
}

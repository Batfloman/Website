export declare class Thread {
    blobURL: string;
    worker: Worker;
    constructor(func: Function);
    postMessage(message: string): void;
    terminate(): void;
}

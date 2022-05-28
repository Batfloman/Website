export declare class Thread {
    blobURL: string;
    worker: Worker;
    constructor(func: Function);
    postMessage(message: any): void;
    terminate(): void;
}

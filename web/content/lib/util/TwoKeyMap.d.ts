export declare class TwoKeyMap<K, K2, V> {
    map: Map<K, Map<K2, V>>;
    constructor();
    get(key: K, key2: K2): V | undefined;
    set(key: K, key2: K2, value: V): void;
    clear(): void;
}

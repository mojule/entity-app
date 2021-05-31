export declare type ObjectMap<T> = Record<string, T>;
export declare type KeyValueMap<T, V> = {
    [key in keyof T]: V;
};
export interface AsyncEachCallback<T> {
    (item: T): Promise<void>;
}
export interface KeyValueEachCallback<T, V> {
    (value: V, key: keyof T & string): void;
}
export interface KeyValueMapCallback<T, V, U> {
    (value: V, key: keyof T & string): U;
}
export interface ObjectMapEachCallback<T> {
    (value: T, key: string): void;
}
export interface ObjectMapMapCallback<T, U> {
    (value: T, key: string): U;
}

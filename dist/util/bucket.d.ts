export interface PredicateMap<T> {
    [id: string]: (value: T) => boolean;
}
export interface Buckets<T> {
    [id: string]: T[];
}
export declare const bucket: <T>(items: T[], predicateMap: PredicateMap<T>) => Buckets<T>;

import { KeyValueMap, ObjectMap, AsyncEachCallback, KeyValueEachCallback, ObjectMapEachCallback, ObjectMapMapCallback, KeyValueMapCallback } from './types';
export declare const eachAsync: <T>(arr: T[], cb: AsyncEachCallback<T>) => Promise<void>;
export declare const eachKeyValueMap: <T, V>(kvs: KeyValueMap<T, V>, cb: KeyValueEachCallback<T, V>) => void;
export declare const eachObjectMap: <T>(obj: ObjectMap<T>, cb: ObjectMapEachCallback<T>) => void;
export declare const mapObjectMap: <T, U>(obj: ObjectMap<T>, cb: ObjectMapMapCallback<T, U>) => U[];
export declare const mapKeyValueMap: <T, V, U>(kvs: KeyValueMap<T, V>, cb: KeyValueMapCallback<T, V, U>) => U[];
export declare const createSequence: <T>(length: number, cb: (index: number) => T) => T[];

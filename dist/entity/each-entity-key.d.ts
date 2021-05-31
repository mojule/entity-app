import { EntityKeys } from './types';
export interface EntityKeyCallback<TEntityMap> {
    (key: keyof TEntityMap & string): Promise<void>;
}
export interface EntityKeyCallbackSync<TEntityMap> {
    (key: keyof TEntityMap & string): void;
}
export declare const eachEntityKey: <TEntityMap>(keys: EntityKeys<TEntityMap>, cb: EntityKeyCallback<TEntityMap>) => Promise<void>;
export declare const eachEntityKeySync: <TEntityMap>(keys: EntityKeys<TEntityMap>, cb: EntityKeyCallbackSync<TEntityMap>) => void;

export declare type EntityKeys<TEntityMap> = {
    [key in keyof TEntityMap]: key;
};
export interface EntityCategory<TEntityMap> {
    title: string;
    keys: (keyof TEntityMap)[];
}
export interface EntityCategories<TEntityMap> {
    [key: string]: EntityCategory<TEntityMap>;
    entity: EntityCategory<TEntityMap>;
}

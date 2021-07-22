import { DbRefFor, EntityKeys } from '..';
export declare type DbFoo = {
    name: string;
    value: number;
};
export declare type Foo = DbFoo;
export declare type DbBar = DbFoo & {
    foo?: DbRefFor<FooBarEntityMap, 'foo'>;
};
export declare type Bar = Foo & {
    foo?: Foo;
};
export declare type FooBarEntityMap = {
    foo: DbFoo;
    bar: DbBar;
};
export declare type FooBarModelMap = {
    foo: Foo;
    bar: Bar;
};
export declare const fooBarEntityKeys: EntityKeys<FooBarEntityMap>;

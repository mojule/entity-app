import { DbRefFor } from '../../db/types';
export declare type RefDbEntityMap = {
    foo: RefDbFoo;
    bar: RefDbBar;
    baz: RefDbBaz;
    qux: RefDbQux;
};
export declare type RefDbModelMap = Record<keyof RefDbEntityMap, {}> & {
    foo: RefDbFooModel;
    bar: RefDbBarModel;
    baz: RefDbBazModel;
    qux: RefDbQuxModel;
};
export declare type RefDbFoo = {
    name: string;
    bar?: DbRefFor<RefDbEntityMap, 'bar'>;
    qux?: DbRefFor<RefDbEntityMap, 'qux'>;
};
export declare type RefDbFooModel = {
    name: string;
    bar?: RefDbBarModel;
};
export declare type RefDbBar = {
    name?: string;
    baz: DbRefFor<RefDbEntityMap, 'baz'>;
};
export declare type RefDbBarModel = {
    name?: string;
    baz: RefDbBazModel;
};
export declare type RefDbBaz = {
    name: string;
    quxes: DbRefFor<RefDbEntityMap, 'qux'>[];
};
export declare type RefDbBazModel = {
    name: string;
    quxes: RefDbQuxModel[];
};
export declare type RefDbQux = {
    name: string;
    foo?: DbRefFor<RefDbEntityMap, 'foo'>;
};
export declare type RefDbQuxModel = {
    name: string;
    foo?: RefDbFooModel;
};
export declare const createRefDb: () => Promise<import("../..").EntityDb<RefDbEntityMap, import("../..").DbItem>>;

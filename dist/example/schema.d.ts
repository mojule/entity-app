import { FromSchema } from 'json-schema-to-ts';
import { EntityKeys } from '..';
export declare const fooSchema: {
    readonly $id: "#/foo";
    readonly type: "object";
    readonly properties: {
        readonly name: {
            readonly type: "string";
        };
        readonly value: {
            readonly type: "number";
        };
    };
    readonly required: readonly ["name", "value"];
};
export declare const barSchema: {
    readonly $id: "#/bar";
    readonly type: "object";
    readonly properties: {
        readonly foo: import("..").DbRefSchema<"foo">;
        readonly name: {
            readonly type: "string";
        };
        readonly value: {
            readonly type: "number";
        };
    };
    readonly required: readonly ["name", "value"];
};
export declare type DbFoo = FromSchema<typeof fooSchema>;
export declare type Foo = DbFoo;
export declare type DbBar = FromSchema<typeof barSchema>;
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

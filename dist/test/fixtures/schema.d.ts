export declare const testSchemaMap: {
    readonly foo: {
        readonly $id: "#/foo";
        readonly type: "object";
        readonly properties: {
            readonly name: {
                readonly type: "string";
            };
            readonly bar: {
                readonly $ref: "#/bar";
            };
        };
        readonly required: readonly ["name"];
    };
    readonly bar: {
        readonly $id: "#/bar";
        readonly type: "object";
        readonly properties: {
            readonly name: {
                readonly type: "string";
            };
            readonly baz: {
                readonly $ref: "#/baz";
            };
        };
        readonly required: readonly ["name", "baz"];
    };
    readonly baz: {
        readonly $id: "#/baz";
        readonly properties: {
            readonly quxes: {
                readonly type: "array";
                readonly items: {
                    readonly $ref: "#/qux";
                };
            };
        };
        readonly required: readonly ["name", "quxes"];
    };
    readonly qux: {
        readonly $id: "#/qux";
        readonly properties: {
            readonly name: {
                readonly type: "string";
            };
        };
        readonly required: readonly ["name"];
    };
};
export declare const testSchemaDbMap: {
    readonly foo: {
        readonly $id: "#/foo";
        readonly type: "object";
        readonly properties: {
            readonly name: {
                readonly type: "string";
            };
            readonly bar: import("../../schema/types").DbRefSchema<"bar">;
        };
        readonly required: readonly ["name"];
    };
    readonly bar: {
        readonly $id: "#/bar";
        readonly type: "object";
        readonly properties: {
            readonly name: {
                readonly type: "string";
            };
            readonly baz: import("../../schema/types").DbRefSchema<"baz">;
        };
        readonly required: readonly ["baz"];
    };
    readonly baz: {
        readonly $id: "#/baz";
        readonly properties: {
            readonly quxes: {
                readonly type: "array";
                readonly items: import("../../schema/types").DbRefSchema<"qux">;
            };
        };
        readonly required: readonly ["name", "quxes"];
    };
    readonly qux: {
        readonly $id: "#/qux";
        readonly properties: {
            readonly name: {
                readonly type: "string";
            };
        };
        readonly required: readonly ["name"];
    };
};

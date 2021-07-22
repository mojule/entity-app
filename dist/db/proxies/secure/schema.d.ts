export declare const secureDbItemSchema: {
    readonly id: "#/secure-db-item";
    readonly title: "Secure DB Item";
    readonly type: "object";
    readonly properties: {
        readonly _id: {
            readonly type: "string";
        };
        readonly _atime: {
            readonly type: "integer";
        };
        readonly _ctime: {
            readonly type: "integer";
        };
        readonly _mtime: {
            readonly type: "integer";
        };
        readonly _ver: {
            readonly type: "integer";
            readonly minimum: 0;
        };
        readonly _mode: {
            readonly type: "integer";
            readonly minimum: 0;
            readonly maximum: 4095;
            readonly default: 448;
        };
        readonly _owner: import("../../..").DbRefSchema<"user">;
        readonly _group: import("../../..").DbRefSchema<"group">;
    };
    readonly required: readonly ["_id", "_mode", "_owner", "_group", "_atime", "_ctime", "_mtime", "_ver"];
};
export declare const secureUserSchema: {
    readonly id: "#/secure-user";
    readonly title: "Secure User";
    readonly type: "object";
    readonly properties: {
        readonly name: {
            readonly type: "string";
        };
        readonly password: {
            readonly type: "string";
            readonly format: "password";
        };
        readonly isRoot: {
            readonly type: "boolean";
            readonly default: false;
        };
    };
    readonly required: readonly ["name", "password"];
};
export declare const secureGroupSchema: {
    readonly id: "#/secure-group";
    readonly title: "Secure Group";
    readonly type: "object";
    readonly properties: {
        readonly name: {
            readonly type: "string";
        };
        readonly users: {
            readonly type: "array";
            readonly items: import("../../..").DbRefSchema<"user">;
        };
    };
    readonly required: readonly ["name", "users"];
};
export declare const secureCollectionSchema: {
    readonly id: "#/secure-collection";
    readonly title: "Secure Collection";
    readonly type: "object";
    readonly properties: {
        readonly name: {
            readonly type: "string";
        };
    };
    readonly required: readonly ["name"];
};

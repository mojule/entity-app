export declare const userRefSchema: {
    readonly properties: {
        readonly _collection: {
            readonly title: "User";
            readonly type: "string";
            readonly enum: readonly ["user"];
        };
        readonly _id: {
            readonly title: "ID";
            readonly type: "string";
        };
    };
    readonly type: "object";
    readonly additionalProperties: false;
    readonly required: readonly ["_id", "_collection"];
    readonly $id: "#/user-ref";
    readonly title: "User";
};

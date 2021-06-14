export declare const userRefSchema: {
    readonly type: "object";
    readonly properties: {
        readonly _id: {
            readonly title: "ID";
            readonly type: "string";
        };
        readonly _collection: {
            readonly title: "Collection";
            readonly type: "string";
            readonly enum: readonly ["user"];
        };
    };
    readonly additionalProperties: false;
    readonly required: readonly ["_id", "_collection"];
};

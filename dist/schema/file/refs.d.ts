export declare const fileRefSchema: {
    readonly type: "object";
    readonly properties: {
        readonly _id: {
            readonly title: "ID";
            readonly type: "string";
        };
        readonly _collection: {
            readonly title: "Collection";
            readonly type: "string";
            readonly enum: readonly ["file"];
        };
    };
    readonly additionalProperties: false;
    readonly required: readonly ["_id", "_collection"];
};
export declare const imageFileRefSchema: {
    readonly type: "object";
    readonly properties: {
        readonly _id: {
            readonly title: "ID";
            readonly type: "string";
        };
        readonly _collection: {
            readonly title: "Collection";
            readonly type: "string";
            readonly enum: readonly ["imageFile"];
        };
    };
    readonly additionalProperties: false;
    readonly required: readonly ["_id", "_collection"];
};
export declare const zipFileRefSchema: {
    readonly type: "object";
    readonly properties: {
        readonly _id: {
            readonly title: "ID";
            readonly type: "string";
        };
        readonly _collection: {
            readonly title: "Collection";
            readonly type: "string";
            readonly enum: readonly ["zipFile"];
        };
    };
    readonly additionalProperties: false;
    readonly required: readonly ["_id", "_collection"];
};

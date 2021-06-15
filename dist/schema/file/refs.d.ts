export declare const fileRefSchema: {
    readonly properties: {
        readonly _collection: {
            readonly title: "File";
            readonly type: "string";
            readonly enum: readonly ["file"];
        };
        readonly _id: {
            readonly title: "ID";
            readonly type: "string";
        };
    };
    readonly type: "object";
    readonly additionalProperties: false;
    readonly required: readonly ["_id", "_collection"];
    readonly $id: "#/file-ref";
    readonly title: "File Reference";
};
export declare const imageFileRefSchema: {
    readonly properties: {
        readonly _collection: {
            readonly title: "Image File";
            readonly type: "string";
            readonly enum: readonly ["imageFile"];
        };
        readonly _id: {
            readonly title: "ID";
            readonly type: "string";
        };
    };
    readonly type: "object";
    readonly additionalProperties: false;
    readonly required: readonly ["_id", "_collection"];
    readonly $id: "#/image-file-ref";
    readonly title: "Image File Reference";
};
export declare const zipFileRefSchema: {
    readonly properties: {
        readonly _collection: {
            readonly title: "Zip File";
            readonly type: "string";
            readonly enum: readonly ["zipFile"];
        };
        readonly _id: {
            readonly title: "ID";
            readonly type: "string";
        };
    };
    readonly type: "object";
    readonly additionalProperties: false;
    readonly required: readonly ["_id", "_collection"];
    readonly $id: "#/zip-file-ref";
    readonly title: "Zip File Reference";
};

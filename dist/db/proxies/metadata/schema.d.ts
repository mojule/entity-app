export declare const metadataDbItemSchema: {
    readonly id: "#/metadata-db-item";
    readonly title: "Metadata DB Item";
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
    };
    readonly required: readonly ["_id", "_atime", "_ctime", "_mtime", "_ver"];
};

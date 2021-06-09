export declare const fileMetadataSchema: {
    readonly $id: "#/file-metadata";
    readonly title: "File Metadata";
    readonly type: "object";
    readonly properties: {
        readonly path: {
            readonly $id: "#/path";
            readonly title: "Path";
            readonly description: "Represents an absolute POSIX directory or file path";
            readonly type: "string";
            readonly pattern: "^\\/(((\\.+[\\w\\-]+[\\w\\-\\.]*)+|[\\w\\-]+[\\w\\-\\.]*)\\/)*((\\.+[\\w\\-]+[\\w\\-\\.]*)+|[\\w\\-]+[\\w\\-\\.]*)?$";
        };
        readonly mimetype: {
            readonly $id: "#/media-type";
            readonly title: "Media Type";
            readonly description: "Represents a media type (aka MIME)";
            readonly type: "string";
            readonly pattern: "^\\w+\\/([\\w-]+\\.)*[\\w-]+(\\+[\\w]+)?(;.*)?$";
        };
        readonly size: {
            readonly type: "integer";
            readonly minimum: 0;
        };
    };
    readonly additionalProperties: false;
    readonly required: readonly ["path", "mimetype", "size"];
};

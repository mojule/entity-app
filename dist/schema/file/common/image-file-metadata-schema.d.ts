export declare const imageFileMetadataSchema: {
    readonly $id: "#/image-file-metadata";
    readonly title: "Image File Metadata";
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
        readonly width: {
            readonly type: "integer";
        };
        readonly height: {
            readonly type: "integer";
        };
    };
    readonly additionalProperties: false;
    readonly required: readonly ["path", "mimetype", "size", "width", "height"];
};

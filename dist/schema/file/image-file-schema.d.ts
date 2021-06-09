export declare const imageFileSchema: {
    readonly $id: "#/image-file";
    readonly title: "Image File";
    readonly type: "object";
    readonly properties: {
        readonly name: {
            readonly $id: "#/name";
            readonly title: "Name";
            readonly type: "string";
            readonly minLength: 1;
        };
        readonly tags: {
            readonly $id: "#/tags";
            readonly title: "Tags";
            readonly type: "array";
            readonly items: {
                readonly title: "Tag";
                readonly type: "string";
                readonly pattern: "^[\\w\\-]{1,40}$";
            };
            readonly uniqueItems: true;
        };
        readonly meta: {
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
    };
    readonly required: readonly ["name", "meta"];
};

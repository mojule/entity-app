export declare const zipFileSchema: {
    readonly $id: "#/zip-file";
    readonly title: "ZIP File";
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
        readonly paths: {
            readonly title: "Paths";
            readonly description: "Paths in ZIP";
            readonly type: "array";
            readonly items: {
                readonly $id: "#/path";
                readonly title: "Path";
                readonly description: "Represents an absolute POSIX directory or file path";
                readonly type: "string";
                readonly pattern: "^\\/(((\\.+[\\w\\-]+[\\w\\-\\.]*)+|[\\w\\-]+[\\w\\-\\.]*)\\/)*((\\.+[\\w\\-]+[\\w\\-\\.]*)+|[\\w\\-]+[\\w\\-\\.]*)?$";
            };
        };
        readonly files: {
            readonly title: "Files";
            readonly description: "Files in ZIP";
            readonly type: "array";
            readonly items: import("../types").DbRefSchema<"file">;
        };
        readonly images: {
            readonly title: "Images";
            readonly description: "Images in ZIP";
            readonly type: "array";
            readonly items: import("../types").DbRefSchema<"imageFile">;
        };
    };
    readonly required: readonly ["name", "meta", "paths", "files", "images"];
};

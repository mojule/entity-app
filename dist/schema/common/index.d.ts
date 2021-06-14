export declare const commonSchema: {
    byteSize: {
        readonly $id: "#/byte-size";
        readonly title: "Size";
        readonly description: "Size in bytes";
        readonly type: "integer";
        readonly minimum: 0;
    };
    directory: {
        readonly $id: "#/directory";
        readonly title: "Directory";
        readonly description: "Represents an absolute POSIX directory path";
        readonly type: "string";
        readonly pattern: "^\\/(((\\.+[\\w\\-]+[\\w\\-\\.]*)+|[\\w\\-]+[\\w\\-\\.]*)\\/)*$";
    };
    filename: {
        readonly $id: "#/filename";
        readonly title: "Filename";
        readonly description: "Represents a filename with no path";
        readonly type: "string";
        readonly pattern: "^(\\.+[\\w\\-]+[\\w\\-\\.]*)+|[\\w\\-]+[\\w\\-\\.]*$";
    };
    mediaType: {
        readonly $id: "#/media-type";
        readonly title: "Media Type";
        readonly description: "Represents a media type (aka MIME)";
        readonly type: "string";
        readonly pattern: "^\\w+\\/([\\w-]+\\.)*[\\w-]+(\\+[\\w]+)?(;.*)?$";
    };
    name: {
        readonly $id: "#/name";
        readonly title: "Name";
        readonly type: "string";
        readonly minLength: 1;
    };
    path: {
        readonly $id: "#/path";
        readonly title: "Path";
        readonly description: "Represents an absolute POSIX directory or file path";
        readonly type: "string";
        readonly pattern: "^\\/(((\\.+[\\w\\-]+[\\w\\-\\.]*)+|[\\w\\-]+[\\w\\-\\.]*)\\/)*((\\.+[\\w\\-]+[\\w\\-\\.]*)+|[\\w\\-]+[\\w\\-\\.]*)?$";
    };
    tags: {
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
};

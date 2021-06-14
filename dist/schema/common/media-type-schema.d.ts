export declare const mediaTypeSchema: {
    readonly $id: "#/media-type";
    readonly title: "Media Type";
    readonly description: "Represents a media type (aka MIME)";
    readonly type: "string";
    readonly pattern: "^\\w+\\/([\\w-]+\\.)*[\\w-]+(\\+[\\w]+)?(;.*)?$";
};

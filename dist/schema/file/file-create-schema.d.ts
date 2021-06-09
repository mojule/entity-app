export declare const fileCreateSchema: {
    readonly $id: "#/file-create";
    readonly title: "Upload File";
    readonly type: "object";
    readonly properties: {
        readonly file: {
            readonly title: "Upload File";
            readonly type: "string";
            readonly format: "file";
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
    };
};

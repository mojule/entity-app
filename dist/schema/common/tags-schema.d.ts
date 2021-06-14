export declare const tagsSchema: {
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

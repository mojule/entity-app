export declare const filenameSchema: {
    readonly $id: "#/filename";
    readonly title: "Filename";
    readonly description: "Represents a filename with no path";
    readonly type: "string";
    readonly pattern: "^(\\.+[\\w\\-]+[\\w\\-\\.]*)+|[\\w\\-]+[\\w\\-\\.]*$";
};

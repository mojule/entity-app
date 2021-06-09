export declare const directorySchema: {
    readonly $id: "#/directory";
    readonly title: "Directory";
    readonly description: "Represents an absolute POSIX directory path";
    readonly type: "string";
    readonly pattern: "^\\/(((\\.+[\\w\\-]+[\\w\\-\\.]*)+|[\\w\\-]+[\\w\\-\\.]*)\\/)*$";
};

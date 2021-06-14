export declare const pathSchema: {
    readonly $id: "#/path";
    readonly title: "Path";
    readonly description: "Represents an absolute POSIX directory or file path";
    readonly type: "string";
    readonly pattern: "^\\/(((\\.+[\\w\\-]+[\\w\\-\\.]*)+|[\\w\\-]+[\\w\\-\\.]*)\\/)*((\\.+[\\w\\-]+[\\w\\-\\.]*)+|[\\w\\-]+[\\w\\-\\.]*)?$";
};

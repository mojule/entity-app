export declare const apiKeySchema: {
    readonly $id: "#/api-key";
    readonly title: "API Key";
    readonly description: "Key for accessing the API";
    readonly type: "object";
    readonly properties: {
        readonly name: {
            readonly title: "Name";
            readonly description: "Name of this API Key";
            readonly type: "string";
        };
        readonly user: import("../types").DbRefSchema<"user">;
        readonly secret: {
            readonly title: "Secret";
            readonly description: "The API Key Secret";
            readonly type: "string";
            readonly default: "";
            readonly readOnly: true;
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
    readonly required: readonly ["name", "user", "secret"];
};

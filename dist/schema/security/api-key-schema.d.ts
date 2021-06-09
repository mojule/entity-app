import { RoleMap } from '../../security/types';
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
        readonly user: {
            readonly type: "object";
            readonly properties: {
                readonly _id: {
                    readonly title: "ID";
                    readonly type: "string";
                };
                readonly _collection: {
                    readonly title: "Collection";
                    readonly type: "string";
                    readonly enum: readonly ["user"];
                };
            };
            readonly additionalProperties: false;
            readonly required: readonly ["_id", "_collection"];
        };
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
export declare const apiKeyRoles: RoleMap;

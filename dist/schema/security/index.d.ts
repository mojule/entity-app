import * as resetPasswordSchema from './reset-password-schema';
export declare const securitySchema: {
    apiKey: {
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
                readonly properties: {
                    readonly _collection: {
                        readonly title: "User";
                        readonly type: "string";
                        readonly enum: readonly ["user"];
                    };
                    readonly _id: {
                        readonly title: "ID";
                        readonly type: "string";
                    };
                };
                readonly type: "object";
                readonly additionalProperties: false;
                readonly required: readonly ["_id", "_collection"];
                readonly $id: "#/user-ref";
                readonly title: "User";
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
    } & {
        _esRoles: import("../..").RoleMap;
    };
    user: {
        readonly $id: "#/user";
        readonly title: "User";
        readonly description: "Person with access to the system";
        readonly type: "object";
        readonly properties: {
            readonly name: {
                readonly title: "Name";
                readonly description: "The user's name";
                readonly type: "string";
            };
            readonly email: {
                readonly title: "Email";
                readonly description: "The user's email address";
                readonly type: "string";
                readonly format: "email";
            };
            readonly password: {
                readonly title: "Password";
                readonly description: "The user's password";
                readonly type: "string";
                readonly format: "password";
            };
            readonly roles: {
                readonly title: "Roles";
                readonly description: "The user's roles";
                readonly type: "array";
                readonly items: {
                    readonly title: "Role";
                    readonly description: "Name of this role";
                    readonly type: "string";
                };
            };
        };
        readonly required: readonly ["name", "email", "password", "roles"];
    } & {
        _esRoles: import("../..").RoleMap;
    };
    pendingUser: {
        readonly $id: "#/pending-user";
        readonly title: "Pending User";
        readonly description: "Person awaiting access to the system";
        readonly type: "object";
        readonly properties: {
            readonly secret: {
                readonly title: "Secret";
                readonly description: "The Pending User Secret";
                readonly type: "string";
            };
            readonly name: {
                readonly title: "Name";
                readonly description: "The user's name";
                readonly type: "string";
            };
            readonly email: {
                readonly title: "Email";
                readonly description: "The user's email address";
                readonly type: "string";
                readonly format: "email";
            };
            readonly password: {
                readonly title: "Password";
                readonly description: "The user's password";
                readonly type: "string";
                readonly format: "password";
            };
            readonly roles: {
                readonly title: "Roles";
                readonly description: "The user's roles";
                readonly type: "array";
                readonly items: {
                    readonly title: "Role";
                    readonly description: "Name of this role";
                    readonly type: "string";
                };
            };
        };
        readonly required: readonly ["name", "email", "password", "roles", "secret"];
    } & {
        _esRoles: import("../..").RoleMap;
    };
    resetPassword: typeof resetPasswordSchema;
};

export declare const secretSchema: {
    readonly id: "#/secret";
    readonly title: "Secret";
    readonly type: "object";
    readonly properties: {
        readonly secret: {
            readonly title: "Secret";
            readonly type: "string";
            readonly format: "password";
        };
    };
    readonly required: readonly ["secret"];
};
export declare const userSecretSchema: {
    readonly id: "#/user-secret";
    readonly title: "User Secret";
    readonly type: "object";
    readonly properties: {
        readonly type: {
            readonly type: "string";
        };
        readonly user: import("../../../..").DbRefSchema<"user">;
        readonly secret: {
            readonly title: "Secret";
            readonly type: "string";
            readonly format: "password";
        };
    };
    readonly required: readonly ["type", "user", "secret"];
};
export declare const pendingUserSchema: {
    readonly id: "#/pending-user";
    readonly title: "Pending User";
    readonly type: "object";
    readonly properties: {
        readonly secret: {
            readonly title: "Secret";
            readonly type: "string";
            readonly format: "password";
        };
        readonly name: {
            readonly type: "string";
        };
        readonly password: {
            readonly type: "string";
            readonly format: "password";
        };
    };
    readonly required: readonly ["name", "password", "secret"];
};

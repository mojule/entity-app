export declare const resetPasswordSchema: {
    readonly $id: "#/reset-password";
    readonly title: "Reset Password";
    readonly description: "Reset a user's forgotten password";
    readonly type: "object";
    readonly properties: {
        readonly name: {
            readonly title: "Name";
            readonly description: "Name of this reset Key";
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
            readonly description: "Secret for forgot password";
            readonly type: "string";
            readonly default: "";
            readonly readOnly: true;
        };
    };
    readonly required: readonly ["user", "secret"];
};

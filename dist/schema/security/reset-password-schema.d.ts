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
        readonly user: import("../types").DbRefSchema<"user">;
        readonly secret: {
            readonly title: "Secret";
            readonly description: "Secret for forgot password";
            readonly type: "string";
        };
    };
    readonly required: readonly ["name", "user", "secret"];
};

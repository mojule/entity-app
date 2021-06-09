import { RoleMap } from '../../security/types';
export declare const userSchema: {
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
};
export declare const userRoles: RoleMap;
export declare const userPropertyRoles: Record<string, RoleMap>;

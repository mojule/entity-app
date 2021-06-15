"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPropertyRoles = exports.userRoles = exports.pendingUserSchema = exports.userSchema = void 0;
const userSharedSchemaProperties = {
    "name": {
        "title": "Name",
        "description": "The user's name",
        "type": "string"
    },
    "email": {
        "title": "Email",
        "description": "The user's email address",
        "type": "string",
        "format": "email"
    },
    "password": {
        "title": "Password",
        "description": "The user's password",
        "type": "string",
        "format": "password"
    },
    "roles": {
        "title": "Roles",
        "description": "The user's roles",
        "type": "array",
        "items": {
            "title": "Role",
            "description": "Name of this role",
            "type": "string"
        }
    }
};
const userSharedRequired = [
    "name", "email", "password", "roles"
];
exports.userSchema = {
    "$id": "#/user",
    "title": "User",
    "description": "Person with access to the system",
    "type": "object",
    "properties": Object.assign({}, userSharedSchemaProperties),
    "required": userSharedRequired
};
exports.pendingUserSchema = {
    "$id": "#/pending-user",
    "title": "Pending User",
    "description": "Person awaiting access to the system",
    "type": "object",
    "properties": Object.assign(Object.assign({}, userSharedSchemaProperties), { "secret": {
            "title": "Secret",
            "description": "The Pending User Secret",
            "type": "string"
        } }),
    "required": [...userSharedRequired, 'secret']
};
exports.userRoles = {
    "create": [
        "admin"
    ],
    "read": [
        "admin"
    ],
    "update": [
        "admin"
    ],
    "delete": [
        "admin"
    ]
};
exports.userPropertyRoles = {
    password: {
        "create": [
            "admin",
            "public"
        ],
        "read": [
            "admin"
        ],
        "update": [
            "admin",
            "currentUser"
        ],
        "delete": [
            "admin"
        ]
    },
    roles: {
        "create": [
            "admin"
        ],
        "read": [
            "admin"
        ],
        "update": [
            "admin"
        ],
        "delete": [
            "admin"
        ]
    }
};
//# sourceMappingURL=user-schema.js.map
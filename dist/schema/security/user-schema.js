"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPropertyRoles = exports.userRoles = exports.userSchema = void 0;
exports.userSchema = {
    "$id": "#/user",
    "title": "User",
    "description": "Person with access to the system",
    "type": "object",
    "properties": {
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
    },
    "required": [
        "name",
        "email",
        "password",
        "roles"
    ]
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
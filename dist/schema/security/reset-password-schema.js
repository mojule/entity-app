"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = void 0;
const refs_1 = require("./refs");
exports.resetPasswordSchema = {
    "$id": "#/reset-password",
    "title": "Reset Password",
    "description": "Reset a user's forgotten password",
    "type": "object",
    "properties": {
        "name": {
            "title": "Name",
            "description": "Name of this reset Key",
            "type": "string"
        },
        "user": refs_1.userRefSchema,
        "secret": {
            "title": "Secret",
            "description": "Secret for forgot password",
            "type": "string",
            "default": "",
            "readOnly": true
        }
    },
    "required": [
        "name",
        "user",
        "secret"
    ]
};
//# sourceMappingURL=reset-password-schema.js.map
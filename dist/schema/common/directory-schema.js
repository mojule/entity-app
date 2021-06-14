"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.directorySchema = void 0;
exports.directorySchema = {
    "$id": "#/directory",
    "title": "Directory",
    "description": "Represents an absolute POSIX directory path",
    "type": "string",
    "pattern": "^\\/(((\\.+[\\w\\-]+[\\w\\-\\.]*)+|[\\w\\-]+[\\w\\-\\.]*)\\/)*$"
};
//# sourceMappingURL=directory-schema.js.map
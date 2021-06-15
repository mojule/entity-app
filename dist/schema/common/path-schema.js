"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathSchema = void 0;
exports.pathSchema = {
    $id: '#/path',
    title: 'Path',
    description: 'Represents an absolute POSIX directory or file path',
    type: 'string',
    pattern: '^\\/(((\\.+[\\w\\-]+[\\w\\-\\.]*)+|[\\w\\-]+[\\w\\-\\.]*)\\/)*((\\.+[\\w\\-]+[\\w\\-\\.]*)+|[\\w\\-]+[\\w\\-\\.]*)?$'
};
//# sourceMappingURL=path-schema.js.map
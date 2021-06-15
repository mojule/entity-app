"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagsSchema = void 0;
exports.tagsSchema = {
    $id: '#/tags',
    title: 'Tags',
    type: 'array',
    items: {
        title: 'Tag',
        type: 'string',
        pattern: '^[\\w\\-]{1,40}$'
    },
    uniqueItems: true
};
//# sourceMappingURL=tags-schema.js.map
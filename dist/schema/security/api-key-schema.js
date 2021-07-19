"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiKeySchema = void 0;
const tags_schema_1 = require("../common/tags-schema");
const refs_1 = require("./refs");
exports.apiKeySchema = {
    $id: '#/api-key',
    title: 'API Key',
    description: 'Key for accessing the API',
    type: 'object',
    properties: {
        name: {
            title: 'Name',
            description: 'Name of this API Key',
            type: 'string'
        },
        user: refs_1.userRefSchema,
        secret: {
            title: 'Secret',
            description: 'The API Key Secret',
            type: 'string',
            default: '',
            readOnly: true
        },
        tags: tags_schema_1.tagsSchema
    },
    required: [
        'name',
        'user',
        'secret'
    ]
};
//# sourceMappingURL=api-key-schema.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaTypeSchema = void 0;
exports.mediaTypeSchema = {
    $id: '#/media-type',
    title: 'Media Type',
    description: 'Represents a media type (aka MIME)',
    type: 'string',
    pattern: '^\\w+\\/([\\w-]+\\.)*[\\w-]+(\\+[\\w]+)?(;.*)?$'
};
//# sourceMappingURL=media-type-schema.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fooBarEntityKeys = exports.barSchema = exports.fooSchema = void 0;
const __1 = require("..");
exports.fooSchema = {
    $id: '#/foo',
    type: 'object',
    properties: {
        name: { type: 'string' },
        value: { type: 'number' }
    },
    required: ['name', 'value']
};
const createDbRef = __1.refFactory('#');
exports.barSchema = {
    $id: '#/bar',
    type: 'object',
    properties: Object.assign(Object.assign({}, exports.fooSchema.properties), { foo: createDbRef('foo') }),
    required: ['name', 'value']
};
exports.fooBarEntityKeys = {
    foo: 'foo',
    bar: 'bar'
};
//# sourceMappingURL=schema.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testSchemaDbMap = exports.testSchemaMap = void 0;
const ref_1 = require("../../schema/ref");
exports.testSchemaMap = {
    foo: {
        $id: '#/foo',
        type: 'object',
        properties: {
            name: { type: 'string' },
            bar: { $ref: '#/bar' }
        },
        required: ['name']
    },
    bar: {
        $id: '#/bar',
        type: 'object',
        properties: {
            name: { type: 'string' },
            baz: { $ref: '#/baz' }
        },
        required: ['name', 'baz']
    },
    baz: {
        $id: '#/baz',
        properties: {
            quxes: {
                type: 'array',
                items: { $ref: '#/qux' }
            }
        },
        required: ['name', 'quxes']
    },
    qux: {
        $id: '#/qux',
        properties: {
            name: { type: 'string' }
        },
        required: ['name']
    }
};
const createRef = ref_1.refFactory('#');
exports.testSchemaDbMap = {
    foo: {
        $id: '#/foo',
        type: 'object',
        properties: {
            name: { type: 'string' },
            bar: createRef('bar')
        },
        required: ['name']
    },
    bar: {
        $id: '#/bar',
        type: 'object',
        properties: {
            name: { type: 'string' },
            baz: createRef('baz')
        },
        required: ['baz']
    },
    baz: {
        $id: '#/baz',
        properties: {
            quxes: {
                type: 'array',
                items: createRef('qux')
            }
        },
        required: ['name', 'quxes']
    },
    qux: {
        $id: '#/qux',
        properties: {
            name: { type: 'string' }
        },
        required: ['name']
    }
};
//# sourceMappingURL=schema.js.map
import { refFactory } from '../../schema/ref'
import { SchemaMap } from '../../schema/types'

export const testSchemaMap = {
  foo: {
    $id: '#/foo',
    type: 'object',
    properties: {
      name: { type: 'string' },
      bar: { $ref: '#/bar' }
    },
    required: [ 'name' ]
  },
  bar: {
    $id: '#/bar',
    type: 'object',
    properties: {
      name: { type: 'string' },
      baz: { $ref: '#/baz' }
    },
    required: [ 'name', 'baz' ]
  },
  baz: {
    $id: '#/baz',
    properties: {
      quxes: {
        type: 'array',
        items: { $ref: '#/qux' }
      }
    },
    required: [ 'name', 'quxes' ]
  },
  qux: {
    $id: '#/qux',
    properties: {
      name: { type: 'string' }
    },
    required: [ 'name' ]
  }
} as const

const createRef = refFactory( '#' )

export const testSchemaDbMap = {
  foo: {
    $id: '#/foo',
    type: 'object',
    properties: {
      name: { type: 'string' },
      bar: createRef( 'bar' )
    },
    required: [ 'name' ]
  },
  bar: {
    $id: '#/bar',
    type: 'object',
    properties: {
      name: { type: 'string' },
      baz: createRef( 'baz' )
    },
    required: [ 'baz' ]
  },
  baz: {
    $id: '#/baz',
    properties: {
      quxes: {
        type: 'array',
        items: createRef( 'qux' )
      }
    },
    required: [ 'name', 'quxes' ]
  },
  qux: {
    $id: '#/qux',
    properties: {
      name: { type: 'string' }
    },
    required: [ 'name' ]
  }
} as const
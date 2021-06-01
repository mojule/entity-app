import { svgNs } from './consts'

export const isNode = (value: any): value is Node =>
  value && typeof value['nodeType'] === 'number'

export const isElement = (value: any): value is Element =>
  value && value['nodeType'] === 1

export const isSVGElement = (value: any): value is SVGElement =>
  isElement(value) && value.namespaceURI === svgNs

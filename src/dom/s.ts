import { svgNs } from './consts'
import { isElement, isSVGElement } from './predicates'
import { SArg } from './types'
import { attr } from './util'

export const s = <K extends keyof SVGElementTagNameMap>(
  name: K, ...args: SArg[]
): SVGElementTagNameMap[K] => {
  const el = document.createElementNS(svgNs, name)

  args.forEach(arg => {
    if (isSVGElement(arg) || isElement(arg) || typeof arg === 'string') {
      el.append(arg)
    } else {
      attr(el, arg)
    }
  })

  return el
}

export const svgElementFactory = <K extends keyof SVGElementTagNameMap>(
  name: K
) =>
  (...args: SArg[]) => s(name, ...args)


export type GradientStop = [number, string]

export const $a = svgElementFactory('a')
export const circle = svgElementFactory('circle')
export const clipPath = svgElementFactory('clipPath')
export const defs = svgElementFactory('defs')
export const desc = svgElementFactory('desc')
export const ellipse = svgElementFactory('ellipse')
export const feBlend = svgElementFactory('feBlend')
export const feColorMatrix = svgElementFactory('feColorMatrix')
export const feComponentTransfer = svgElementFactory('feComponentTransfer')
export const feComposite = svgElementFactory('feComposite')
export const feConvolveMatrix = svgElementFactory('feConvolveMatrix')
export const feDiffuseLighting = svgElementFactory('feDiffuseLighting')
export const feDisplacementMap = svgElementFactory('feDisplacementMap')
export const feDistantLight = svgElementFactory('feDistantLight')
export const feFlood = svgElementFactory('feFlood')
export const feFuncA = svgElementFactory('feFuncA')
export const feFuncB = svgElementFactory('feFuncB')
export const feFuncG = svgElementFactory('feFuncG')
export const feFuncR = svgElementFactory('feFuncR')
export const feGaussianBlur = svgElementFactory('feGaussianBlur')
export const feImage = svgElementFactory('feImage')
export const feMerge = svgElementFactory('feMerge')
export const feMergeNode = svgElementFactory('feMergeNode')
export const feMorphology = svgElementFactory('feMorphology')
export const feOffset = svgElementFactory('feOffset')
export const fePointLight = svgElementFactory('fePointLight')
export const feSpecularLighting = svgElementFactory('feSpecularLighting')
export const feSpotLight = svgElementFactory('feSpotLight')
export const feTile = svgElementFactory('feTile')
export const feTurbulence = svgElementFactory('feTurbulence')
export const filter = svgElementFactory('filter')
export const foreignObject = svgElementFactory('foreignObject')
export const g = svgElementFactory('g')
export const image = svgElementFactory('image')
export const line = svgElementFactory('line')
export const linearGradient = svgElementFactory('linearGradient')
export const marker = svgElementFactory('marker')
export const mask = svgElementFactory('mask')
export const metadata = svgElementFactory('metadata')
export const path = svgElementFactory('path')
export const pattern = svgElementFactory('pattern')
export const polygon = svgElementFactory('polygon')
export const polyline = svgElementFactory('polyline')
export const radialGradient = svgElementFactory('radialGradient')
export const rect = svgElementFactory('rect')
export const $script = svgElementFactory('script')
export const stop = svgElementFactory('stop')
export const $style = svgElementFactory('style')
export const svg = svgElementFactory('svg')
export const $switch = svgElementFactory('switch')
export const symbol = svgElementFactory('symbol')
export const $text = svgElementFactory('text')
export const textPath = svgElementFactory('textPath')
export const $title = svgElementFactory('title')
export const tspan = svgElementFactory('tspan')
export const use = svgElementFactory('use')
export const view = svgElementFactory('view')

export const createLinearGradient = (
  stops: GradientStop[],
  x1: number, y1: number, x2: number, y2: number,
  gradientUnits = 'userSpaceOnUse'
) => {
  const el = linearGradient(...stops.map(createStop))

  attr(el, { gradientUnits, x1, y1, x2, y2 })

  return el
}

const createStop = ([offset, color]: GradientStop) =>
  stop(
    { offset, style: `stop-color:${color}` }
  )
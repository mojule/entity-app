import { SArg } from './types';
export declare const s: <K extends keyof SVGElementTagNameMap>(name: K, ...args: SArg[]) => SVGElementTagNameMap[K];
export declare const svgElementFactory: <K extends keyof SVGElementTagNameMap>(name: K) => (...args: SArg[]) => SVGElementTagNameMap[K];
export declare type GradientStop = [number, string];
export declare const $a: (...args: SArg[]) => SVGAElement;
export declare const circle: (...args: SArg[]) => SVGCircleElement;
export declare const clipPath: (...args: SArg[]) => SVGClipPathElement;
export declare const defs: (...args: SArg[]) => SVGDefsElement;
export declare const desc: (...args: SArg[]) => SVGDescElement;
export declare const ellipse: (...args: SArg[]) => SVGEllipseElement;
export declare const feBlend: (...args: SArg[]) => SVGFEBlendElement;
export declare const feColorMatrix: (...args: SArg[]) => SVGFEColorMatrixElement;
export declare const feComponentTransfer: (...args: SArg[]) => SVGFEComponentTransferElement;
export declare const feComposite: (...args: SArg[]) => SVGFECompositeElement;
export declare const feConvolveMatrix: (...args: SArg[]) => SVGFEConvolveMatrixElement;
export declare const feDiffuseLighting: (...args: SArg[]) => SVGFEDiffuseLightingElement;
export declare const feDisplacementMap: (...args: SArg[]) => SVGFEDisplacementMapElement;
export declare const feDistantLight: (...args: SArg[]) => SVGFEDistantLightElement;
export declare const feFlood: (...args: SArg[]) => SVGFEFloodElement;
export declare const feFuncA: (...args: SArg[]) => SVGFEFuncAElement;
export declare const feFuncB: (...args: SArg[]) => SVGFEFuncBElement;
export declare const feFuncG: (...args: SArg[]) => SVGFEFuncGElement;
export declare const feFuncR: (...args: SArg[]) => SVGFEFuncRElement;
export declare const feGaussianBlur: (...args: SArg[]) => SVGFEGaussianBlurElement;
export declare const feImage: (...args: SArg[]) => SVGFEImageElement;
export declare const feMerge: (...args: SArg[]) => SVGFEMergeElement;
export declare const feMergeNode: (...args: SArg[]) => SVGFEMergeNodeElement;
export declare const feMorphology: (...args: SArg[]) => SVGFEMorphologyElement;
export declare const feOffset: (...args: SArg[]) => SVGFEOffsetElement;
export declare const fePointLight: (...args: SArg[]) => SVGFEPointLightElement;
export declare const feSpecularLighting: (...args: SArg[]) => SVGFESpecularLightingElement;
export declare const feSpotLight: (...args: SArg[]) => SVGFESpotLightElement;
export declare const feTile: (...args: SArg[]) => SVGFETileElement;
export declare const feTurbulence: (...args: SArg[]) => SVGFETurbulenceElement;
export declare const filter: (...args: SArg[]) => SVGFilterElement;
export declare const foreignObject: (...args: SArg[]) => SVGForeignObjectElement;
export declare const g: (...args: SArg[]) => SVGGElement;
export declare const image: (...args: SArg[]) => SVGImageElement;
export declare const line: (...args: SArg[]) => SVGLineElement;
export declare const linearGradient: (...args: SArg[]) => SVGLinearGradientElement;
export declare const marker: (...args: SArg[]) => SVGMarkerElement;
export declare const mask: (...args: SArg[]) => SVGMaskElement;
export declare const metadata: (...args: SArg[]) => SVGMetadataElement;
export declare const path: (...args: SArg[]) => SVGPathElement;
export declare const pattern: (...args: SArg[]) => SVGPatternElement;
export declare const polygon: (...args: SArg[]) => SVGPolygonElement;
export declare const polyline: (...args: SArg[]) => SVGPolylineElement;
export declare const radialGradient: (...args: SArg[]) => SVGRadialGradientElement;
export declare const rect: (...args: SArg[]) => SVGRectElement;
export declare const $script: (...args: SArg[]) => SVGScriptElement;
export declare const stop: (...args: SArg[]) => SVGStopElement;
export declare const $style: (...args: SArg[]) => SVGStyleElement;
export declare const svg: (...args: SArg[]) => SVGSVGElement;
export declare const $switch: (...args: SArg[]) => SVGSwitchElement;
export declare const symbol: (...args: SArg[]) => SVGSymbolElement;
export declare const $text: (...args: SArg[]) => SVGTextElement;
export declare const textPath: (...args: SArg[]) => SVGTextPathElement;
export declare const $title: (...args: SArg[]) => SVGTitleElement;
export declare const tspan: (...args: SArg[]) => SVGTSpanElement;
export declare const use: (...args: SArg[]) => SVGUseElement;
export declare const view: (...args: SArg[]) => SVGViewElement;
export declare const createLinearGradient: (stops: GradientStop[], x1: number, y1: number, x2: number, y2: number, gradientUnits?: string) => SVGLinearGradientElement;

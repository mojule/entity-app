"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$style = exports.stop = exports.$script = exports.rect = exports.radialGradient = exports.polyline = exports.polygon = exports.pattern = exports.path = exports.metadata = exports.mask = exports.marker = exports.linearGradient = exports.line = exports.image = exports.g = exports.foreignObject = exports.filter = exports.feTurbulence = exports.feTile = exports.feSpotLight = exports.feSpecularLighting = exports.fePointLight = exports.feOffset = exports.feMorphology = exports.feMergeNode = exports.feMerge = exports.feImage = exports.feGaussianBlur = exports.feFuncR = exports.feFuncG = exports.feFuncB = exports.feFuncA = exports.feFlood = exports.feDistantLight = exports.feDisplacementMap = exports.feDiffuseLighting = exports.feConvolveMatrix = exports.feComposite = exports.feComponentTransfer = exports.feColorMatrix = exports.feBlend = exports.ellipse = exports.desc = exports.defs = exports.clipPath = exports.circle = exports.$a = exports.svgElementFactory = exports.s = void 0;
exports.createLinearGradient = exports.view = exports.use = exports.tspan = exports.$title = exports.textPath = exports.$text = exports.symbol = exports.$switch = exports.svg = void 0;
const consts_1 = require("./consts");
const predicates_1 = require("./predicates");
const util_1 = require("./util");
const s = (name, ...args) => {
    const el = document.createElementNS(consts_1.svgNs, name);
    args.forEach(arg => {
        if (predicates_1.isSVGElement(arg) || predicates_1.isElement(arg) || typeof arg === 'string') {
            el.append(arg);
        }
        else {
            util_1.attr(el, arg);
        }
    });
    return el;
};
exports.s = s;
const svgElementFactory = (name) => (...args) => exports.s(name, ...args);
exports.svgElementFactory = svgElementFactory;
exports.$a = exports.svgElementFactory('a');
exports.circle = exports.svgElementFactory('circle');
exports.clipPath = exports.svgElementFactory('clipPath');
exports.defs = exports.svgElementFactory('defs');
exports.desc = exports.svgElementFactory('desc');
exports.ellipse = exports.svgElementFactory('ellipse');
exports.feBlend = exports.svgElementFactory('feBlend');
exports.feColorMatrix = exports.svgElementFactory('feColorMatrix');
exports.feComponentTransfer = exports.svgElementFactory('feComponentTransfer');
exports.feComposite = exports.svgElementFactory('feComposite');
exports.feConvolveMatrix = exports.svgElementFactory('feConvolveMatrix');
exports.feDiffuseLighting = exports.svgElementFactory('feDiffuseLighting');
exports.feDisplacementMap = exports.svgElementFactory('feDisplacementMap');
exports.feDistantLight = exports.svgElementFactory('feDistantLight');
exports.feFlood = exports.svgElementFactory('feFlood');
exports.feFuncA = exports.svgElementFactory('feFuncA');
exports.feFuncB = exports.svgElementFactory('feFuncB');
exports.feFuncG = exports.svgElementFactory('feFuncG');
exports.feFuncR = exports.svgElementFactory('feFuncR');
exports.feGaussianBlur = exports.svgElementFactory('feGaussianBlur');
exports.feImage = exports.svgElementFactory('feImage');
exports.feMerge = exports.svgElementFactory('feMerge');
exports.feMergeNode = exports.svgElementFactory('feMergeNode');
exports.feMorphology = exports.svgElementFactory('feMorphology');
exports.feOffset = exports.svgElementFactory('feOffset');
exports.fePointLight = exports.svgElementFactory('fePointLight');
exports.feSpecularLighting = exports.svgElementFactory('feSpecularLighting');
exports.feSpotLight = exports.svgElementFactory('feSpotLight');
exports.feTile = exports.svgElementFactory('feTile');
exports.feTurbulence = exports.svgElementFactory('feTurbulence');
exports.filter = exports.svgElementFactory('filter');
exports.foreignObject = exports.svgElementFactory('foreignObject');
exports.g = exports.svgElementFactory('g');
exports.image = exports.svgElementFactory('image');
exports.line = exports.svgElementFactory('line');
exports.linearGradient = exports.svgElementFactory('linearGradient');
exports.marker = exports.svgElementFactory('marker');
exports.mask = exports.svgElementFactory('mask');
exports.metadata = exports.svgElementFactory('metadata');
exports.path = exports.svgElementFactory('path');
exports.pattern = exports.svgElementFactory('pattern');
exports.polygon = exports.svgElementFactory('polygon');
exports.polyline = exports.svgElementFactory('polyline');
exports.radialGradient = exports.svgElementFactory('radialGradient');
exports.rect = exports.svgElementFactory('rect');
exports.$script = exports.svgElementFactory('script');
exports.stop = exports.svgElementFactory('stop');
exports.$style = exports.svgElementFactory('style');
exports.svg = exports.svgElementFactory('svg');
exports.$switch = exports.svgElementFactory('switch');
exports.symbol = exports.svgElementFactory('symbol');
exports.$text = exports.svgElementFactory('text');
exports.textPath = exports.svgElementFactory('textPath');
exports.$title = exports.svgElementFactory('title');
exports.tspan = exports.svgElementFactory('tspan');
exports.use = exports.svgElementFactory('use');
exports.view = exports.svgElementFactory('view');
const createLinearGradient = (stops, x1, y1, x2, y2, gradientUnits = 'userSpaceOnUse') => {
    const el = exports.linearGradient(...stops.map(createStop));
    util_1.attr(el, { gradientUnits, x1, y1, x2, y2 });
    return el;
};
exports.createLinearGradient = createLinearGradient;
const createStop = ([offset, color]) => exports.stop({ offset, style: `stop-color:${color}` });
//# sourceMappingURL=s.js.map
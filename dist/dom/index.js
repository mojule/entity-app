"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createH = void 0;
const each_1 = require("../util/each");
const createH = (document) => {
    const createElement = (name, ...args) => {
        if (args.length === 0)
            return createEl(name, {});
        const [first, ...nodes] = args;
        if (typeof first === 'string' || isNode(first)) {
            return createEl(name, {}, ...args);
        }
        return createEl(name, first, ...nodes);
    };
    const createEl = (name, attributes, ...childNodes) => {
        const el = document.createElement(name);
        each_1.eachObjectMap(attributes, (value, key) => {
            el.setAttribute(key, value);
        });
        try {
            childNodes.forEach(n => el.appendChild(typeof n === 'string' ? createTextNode(n) : n));
        }
        catch (err) {
            //console.log( { name, attributes, childNodes } )
            throw err;
        }
        return el;
    };
    const createTextNode = (content = '') => document.createTextNode(content);
    const createFragment = (...childNodes) => {
        const fragment = document.createDocumentFragment();
        childNodes.forEach(n => fragment.appendChild(typeof n === 'string' ? createTextNode(n) : n));
        return fragment;
    };
    const handler = {
        get: (_obj, name) => {
            if (name === 'element')
                return createElement;
            if (name === 'text')
                return createTextNode;
            if (name === 'fragment')
                return createFragment;
            return (...args) => createElement(String(name), ...args);
        }
    };
    const h = new Proxy({}, handler);
    return h;
};
exports.createH = createH;
const isNode = (arg) => arg && typeof arg.nodeType === 'number';
//# sourceMappingURL=index.js.map
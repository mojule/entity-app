"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.css = exports.unwrap = exports.decorateAttributes = exports.decorateData = exports.strictSelect = exports.attr = exports.emptyElement = void 0;
const each_1 = require("../util/each");
const h_1 = require("./h");
const emptyElement = (el) => {
    while (el.firstChild)
        el.removeChild(el.firstChild);
};
exports.emptyElement = emptyElement;
const styleKey = 'style';
const attr = (el, ...attributeRecords) => {
    attributeRecords.forEach(attributes => {
        Object.keys(attributes).forEach(key => {
            if (key === styleKey) {
                if (styleKey in el) {
                    const value = attributes[key];
                    if (typeof value === 'string') {
                        el.setAttribute('style', value);
                        return;
                    }
                    const styleTarget = el[styleKey];
                    try {
                        Object.assign(styleTarget, value);
                    }
                    catch (err) {
                        console.warn('setting style on el', { styleTarget, value });
                        throw err;
                    }
                }
                return;
            }
            const value = String(attributes[key]);
            el.setAttribute(key, value);
        });
    });
};
exports.attr = attr;
const strictSelect = (selectors, el = document) => {
    const result = el.querySelector(selectors);
    if (result === null)
        throw Error(`Expected ${selectors} to match something`);
    return result;
};
exports.strictSelect = strictSelect;
const decorateData = (data, ...els) => {
    els.forEach(el => Object.assign(el.dataset, data));
    return h_1.fragment(...els);
};
exports.decorateData = decorateData;
const decorateAttributes = (attr, ...els) => {
    els.forEach(el => {
        each_1.eachObjectMap(attr, (value, key) => {
            el.setAttribute(key, value);
        });
    });
    return h_1.fragment(...els);
};
exports.decorateAttributes = decorateAttributes;
const unwrap = (el) => {
    const { parentElement } = el;
    if (parentElement === null)
        throw Error('Expected parentElement');
    while (el.firstChild) {
        parentElement.insertBefore(el.firstChild, el);
    }
    el.remove();
};
exports.unwrap = unwrap;
const css = (strings, ...keys) => h_1.style(strings.map((s, i) => s + (keys[i] || '')).join(''));
exports.css = css;
//# sourceMappingURL=util.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strictSelect = exports.fragment = exports.document = exports.createDom = void 0;
const jsdom_1 = require("jsdom");
const createDom = (html = '<!doctype html>') => new jsdom_1.JSDOM(html);
exports.createDom = createDom;
const dom = exports.createDom();
exports.document = dom.window.document;
exports.fragment = jsdom_1.JSDOM.fragment;
const strictSelect = (selectors, parent) => {
    parent = parent || exports.document;
    const result = parent.querySelector(selectors);
    if (result === null)
        throw Error('Expected selectors');
    return result;
};
exports.strictSelect = strictSelect;
//# sourceMappingURL=index.js.map
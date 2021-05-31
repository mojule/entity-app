"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decorateAttributes = exports.decorateData = void 0;
const h_1 = require("./h");
const each_1 = require("../../util/each");
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
//# sourceMappingURL=decorate.js.map
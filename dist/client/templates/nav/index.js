"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linksUl = exports.linksNav = exports.link = void 0;
const h_1 = require("../../../dom/h");
const link = ({ content, uri: href }) => href === undefined ? h_1.span(content) : h_1.a({ href }, content);
exports.link = link;
const linksNav = (...model) => h_1.nav(exports.linksUl(...model));
exports.linksNav = linksNav;
const linksUl = (...model) => h_1.ul(...model.map(l => h_1.li(exports.link(l))));
exports.linksUl = linksUl;
//# sourceMappingURL=index.js.map
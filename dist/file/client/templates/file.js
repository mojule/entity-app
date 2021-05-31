"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.file = void 0;
const h_1 = require("../../../client/utils/h");
const css_1 = require("../../../client/utils/h/css");
const file = (model) => {
    const { meta, name } = model;
    const { size } = meta;
    const node = h_1.div({ class: 'file-entity' }, css_1.css `
      .file-entity {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
      }

      .file-entity h1 {
        font-size: 0.9rem;
        margin-bottom: auto;
      }

      .file-entity p {
        font-size: 0.8rem;
      }
    `, h_1.h1({ title: name }, name), h_1.p(`${size.toLocaleString()} bytes`));
    return node;
};
exports.file = file;
//# sourceMappingURL=file.js.map
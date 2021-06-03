"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.file = void 0;
const dom_1 = require("@mojule/dom");
const file = (model) => {
    const { meta, name } = model;
    const { size } = meta;
    const node = dom_1.div({ class: 'file-entity' }, dom_1.css `
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
    `, dom_1.h1({ title: name }, name), dom_1.p(`${size.toLocaleString()} bytes`));
    return node;
};
exports.file = file;
//# sourceMappingURL=file.js.map
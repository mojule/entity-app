"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zipFileRefSchema = exports.imageFileRefSchema = exports.fileRefSchema = void 0;
const ref_1 = require("../ref");
const createRef = ref_1.refFactory('#');
exports.fileRefSchema = createRef('file');
exports.imageFileRefSchema = createRef('imageFile');
exports.zipFileRefSchema = createRef('zipFile');
//# sourceMappingURL=refs.js.map
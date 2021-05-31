"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chunk = exports.sortBy = void 0;
const sortBy = (arr, key) => arr.sort((a, b) => a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0);
exports.sortBy = sortBy;
const chunk = (arr, length) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += length) {
        chunks.push(arr.slice(i, i + length));
    }
    return chunks;
};
exports.chunk = chunk;
//# sourceMappingURL=array.js.map
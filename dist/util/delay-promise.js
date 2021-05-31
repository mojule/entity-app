"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delayPromise = void 0;
const delayPromise = (ms) => new Promise(resolve => setTimeout(resolve, ms));
exports.delayPromise = delayPromise;
//# sourceMappingURL=delay-promise.js.map
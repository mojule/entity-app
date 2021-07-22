"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEperm = void 0;
const createEperm = (operation) => Error(`EPERM: operation not permitted, ${operation}`);
exports.createEperm = createEperm;
//# sourceMappingURL=errors.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delayHandler = void 0;
const random_1 = require("./random");
const delayHandler = (_req, _res, next) => {
    setTimeout(next, random_1.randInt(250));
};
exports.delayHandler = delayHandler;
//# sourceMappingURL=delay-handler.js.map
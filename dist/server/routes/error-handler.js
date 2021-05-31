"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const error_1 = require("../../util/error");
const errorHandler = (res, err = {}) => {
    const status = typeof err.status === 'number' ? err.status : 500;
    res.status(status).json(error_1.errorToObj(err));
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error-handler.js.map
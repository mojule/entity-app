"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValidatedDb = exports.validator = exports.isB = exports.isA = exports.validatorEntityKeys = void 0;
const db_memory_1 = require("../../db/db-memory");
const validator_1 = require("../../db/proxies/validator");
exports.validatorEntityKeys = {
    a: 'a', b: 'b'
};
const isA = (value) => typeof value === 'object' && typeof value['name'] === 'string';
exports.isA = isA;
const isB = (value) => exports.isA(value) && typeof value['age'] === 'number';
exports.isB = isB;
const validator = async (key, entity) => {
    if (key === 'a') {
        if (exports.isA(entity))
            return null;
        return Error('Expected a');
    }
    if (key === 'b') {
        if (exports.isB(entity))
            return null;
        return Error('Expected b');
    }
    return Error('Expected a or b');
};
exports.validator = validator;
const createValidatedDb = async (options) => {
    const memDb = await db_memory_1.createMemoryDb('', exports.validatorEntityKeys, db_memory_1.createDefaultDbItem);
    const validatedDb = validator_1.validatedDbFactory(memDb, exports.validator, options);
    return { memDb, validatedDb };
};
exports.createValidatedDb = createValidatedDb;
//# sourceMappingURL=validator.js.map
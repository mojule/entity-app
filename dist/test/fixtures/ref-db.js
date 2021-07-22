"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRefDb = void 0;
const __1 = require("../..");
const refDbEntityKeys = {
    foo: 'foo',
    bar: 'bar',
    baz: 'baz',
    qux: 'qux'
};
const createRefDb = async () => __1.createMemoryDb('', refDbEntityKeys, __1.createDefaultDbItem);
exports.createRefDb = createRefDb;
//# sourceMappingURL=ref-db.js.map
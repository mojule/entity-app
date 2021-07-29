"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoginBob = exports.createSecureMemDbLogin = exports.getRootUser = exports.entityKeys = void 0;
const __1 = require("../..");
const secure_1 = require("../../db/proxies/secure");
const secure_db_item_1 = require("../../db/proxies/secure/secure-db-item");
const types_1 = require("../../db/proxies/secure/types");
exports.entityKeys = Object.assign({ publicThing: 'publicThing' }, types_1.secureEntityKeys);
const getRootUser = () => ({
    name: 'Nik',
    password: 'goobers'
});
exports.getRootUser = getRootUser;
const createSecureMemDbLogin = async () => {
    const memDb = await __1.createMemoryDb('', exports.entityKeys, secure_db_item_1.createSecureDbItem);
    const login = await secure_1.secureDbFactory(memDb, exports.getRootUser());
    return { login, memDb };
};
exports.createSecureMemDbLogin = createSecureMemDbLogin;
const getLoginBob = () => ({ name: 'Bob', password: 'Boogers' });
exports.getLoginBob = getLoginBob;
//# sourceMappingURL=secure-db.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSecureMemDbLogin = exports.getRootUser = exports.entityKeys = void 0;
const __1 = require("../..");
const secure_1 = require("../../db/proxies/secure");
const secure_db_item_1 = require("../../db/proxies/secure/secure-db-item");
exports.entityKeys = {
    publicThing: 'publicThing',
    user: 'user',
    group: 'group',
    collectionData: 'collectionData'
};
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
//# sourceMappingURL=secure-db.js.map
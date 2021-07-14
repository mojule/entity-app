"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSecureMemDbLogin = exports.getRootUser = exports.entityKeys = void 0;
const util_1 = require("@mojule/util");
const __1 = require("../..");
const secure_1 = require("../../db/proxies/secure");
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
    const createSecureDbItem = () => {
        const now = Date.now();
        const dbItem = {
            _id: util_1.randId(),
            _atime: now,
            _ctime: now,
            _mtime: now,
            _group: {
                _collection: 'group',
                _id: ''
            },
            _owner: {
                _collection: 'user',
                _id: ''
            },
            _mode: 0o0700
        };
        return dbItem;
    };
    const memDb = await __1.createMemoryDb('', exports.entityKeys, createSecureDbItem);
    const login = await secure_1.secureDbFactory(memDb, exports.getRootUser());
    return { login, memDb };
};
exports.createSecureMemDbLogin = createSecureMemDbLogin;
//# sourceMappingURL=secure-db.js.map
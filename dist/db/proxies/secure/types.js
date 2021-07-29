"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secureEntityKeys = exports.privilegedDbItemKeys = void 0;
const types_1 = require("./account-manage/types");
exports.privilegedDbItemKeys = [
    '_mode', '_owner', '_group', '_atime', '_ctime', '_mtime', '_ver'
];
exports.secureEntityKeys = Object.assign({ user: 'user', group: 'group', collectionData: 'collectionData' }, types_1.accountManageEntityKeys);
//# sourceMappingURL=types.js.map
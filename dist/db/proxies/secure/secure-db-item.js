"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSecureDbItem = void 0;
const metadata_1 = require("../metadata");
const createSecureDbItem = () => {
    const metadataDbItem = metadata_1.createMetadataDbItem();
    const dbItem = {
        _group: {
            _collection: 'group',
            _id: ''
        },
        _owner: {
            _collection: 'user',
            _id: ''
        },
        _mode: 0o0770
    };
    const secureDbItem = Object.assign(metadataDbItem, dbItem);
    return secureDbItem;
};
exports.createSecureDbItem = createSecureDbItem;
//# sourceMappingURL=secure-db-item.js.map
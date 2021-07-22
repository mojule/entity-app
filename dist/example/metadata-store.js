"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const metadata_1 = require("../db/proxies/metadata");
const types_1 = require("./types");
const util_1 = require("./util");
const start = async () => {
    const memDb = await __1.createMemoryDb('my metadata db', types_1.fooBarEntityKeys, metadata_1.createMetadataDbItem);
    const db = metadata_1.metadataDbFactory(memDb);
    await util_1.populateDb(db);
    const { bar } = db.collections;
    const dbBar = await bar.findOne({});
    if (dbBar === undefined)
        throw Error('expected dbBar');
    console.log(JSON.stringify(dbBar, null, 2));
    const barModel = await __1.resolveRefsShallow(db, dbBar);
    console.log(JSON.stringify(barModel, null, 2));
};
start().catch(console.error);
//# sourceMappingURL=metadata-store.js.map
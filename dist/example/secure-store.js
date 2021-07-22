"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const db_item_to_entity_1 = require("../db/db-item-to-entity");
const types_1 = require("./types");
const util_1 = require("./util");
const secureFooBarEntityKeys = Object.assign(Object.assign({}, __1.secureEntityKeys), types_1.fooBarEntityKeys);
const start = async () => {
    const root = { name: 'root', password: 'goobers' };
    const bob = { name: 'Bob', password: 'boogers' };
    const memDb = await __1.createMemoryDb('my secure db', secureFooBarEntityKeys, __1.createSecureDbItem);
    const login = await __1.secureDbFactory(memDb, root);
    // login as root and set up users, groups and permissions
    const rootDb = await login(root);
    // don't populate until you have a store
    await util_1.populateDb(rootDb);
    const { foo: rootFoo, bar: rootBar } = rootDb.collections;
    const fooIds = await rootFoo.ids();
    const barIds = await rootBar.ids();
    await rootDb.createUser(bob);
    await rootDb.createGroup('bobs');
    await rootDb.addUserToGroups('Bob', 'bobs');
    await rootDb.chgrp('bobs', 'foo');
    await rootDb.chgrp('bobs', 'bar');
    await rootDb.chmod(0o0770, 'foo');
    await rootDb.chmod(0o0770, 'bar');
    for (const fooId of fooIds) {
        await rootDb.chgrp('bobs', 'foo', fooId);
        await rootDb.chmod(0o0770, 'foo', fooId);
    }
    for (const barId of barIds) {
        await rootDb.chgrp('bobs', 'bar', barId);
        await rootDb.chmod(0o0770, 'bar', barId);
    }
    // login as bob - we should be allowed to access foo and bar
    const bobDb = await login(bob);
    const { foo: bobFoo, bar: bobBar } = bobDb.collections;
    const firstDbFoo = await bobFoo.findOne({});
    if (firstDbFoo === undefined)
        throw Error('Expected firstDbFoo');
    await bobFoo.save({ _id: firstDbFoo._id, value: 7 });
    const firstDbBar = await bobBar.findOne({});
    if (firstDbBar === undefined)
        throw Error('Expected firstDbBar');
    // remove any metadata that we don't want resolved in the model
    const entity = db_item_to_entity_1.dbItemToEntity(firstDbBar);
    const model = await __1.resolveRefsShallow(bobDb, entity);
    console.log(JSON.stringify(model, null, 2));
};
start().catch(console.error);
//# sourceMappingURL=secure-store.js.map
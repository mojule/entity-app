"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const types_1 = require("./types");
const start = async () => {
    const db = await __1.createMemoryDb('my db', types_1.fooBarEntityKeys, __1.createDefaultDbItem);
    const { foo, bar } = db.collections;
    const fooId = await foo.create({ name: 'a', value: 0 });
    const barId = await bar.create({
        name: 'b', value: 1,
        foo: {
            _collection: 'foo',
            _id: fooId
        }
    });
    await bar.save({ _id: barId, value: 2 });
    const dbBar = await bar.load(barId);
    console.log(JSON.stringify(dbBar, null, 2));
    await foo.save({ _id: fooId, value: 5 });
    const barModel = await __1.resolveRefsShallow(db, dbBar);
    console.log(JSON.stringify(barModel, null, 2));
};
start().catch(console.error);
//# sourceMappingURL=memory-store.js.map
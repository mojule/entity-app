"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const each_entity_key_1 = require("../entity/each-entity-key");
describe('entity', () => {
    const keys = { a: 'a', b: 'b', c: 'c' };
    const expect = ['a', 'b', 'c'];
    it('eachEntityKey', async () => {
        const result = [];
        await each_entity_key_1.eachEntityKey(keys, async (key) => {
            result.push(key);
        });
        assert.deepStrictEqual(result, expect);
    });
    it('eachEntityKeySync', () => {
        const result = [];
        each_entity_key_1.eachEntityKeySync(keys, key => {
            result.push(key);
        });
        assert.deepStrictEqual(result, expect);
    });
});
//# sourceMappingURL=entity.js.map
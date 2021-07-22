"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("@mojule/util");
const assert = require("assert");
const password_strength_1 = require("../security/password-strength");
describe('testPassword', () => {
    describe('compulsory', () => {
        it('fails minLength', () => {
            const test = password_strength_1.testPassword('abc');
            assert(!test.isStrong);
            assert(!test.results.minLength);
        });
        it('fails maxLength', () => {
            const test = password_strength_1.testPassword('a'.repeat(129));
            assert(!test.isStrong);
            assert(!test.results.maxLength);
        });
        it('fails repeat', () => {
            const test = password_strength_1.testPassword('a'.repeat(3) + util_1.randId(7));
            assert(!test.isStrong);
            assert(!test.results.repeat);
        });
    });
    describe('optional (3 of 4)', () => {
        it('fails lowercase', () => {
            const test = password_strength_1.testPassword(util_1.randId(10).toUpperCase());
            assert(!test.results.lowercase);
        });
        it('fails uppercase', () => {
            const test = password_strength_1.testPassword(util_1.randId(10).toLowerCase());
            assert(!test.results.uppercase);
        });
        it('fails number', () => {
            const test = password_strength_1.testPassword('aAbBcCdDeE');
            assert(!test.results.number);
        });
        it('fails symbol', () => {
            const test = password_strength_1.testPassword('aA0bB1cC2d');
            assert(!test.results.symbol);
        });
        it('it fails with 2/4', () => {
            const test = password_strength_1.testPassword('aAbBcCdDeE');
            assert(!test.isStrong);
        });
    });
});
//# sourceMappingURL=test-password.js.map
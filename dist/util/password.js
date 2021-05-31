"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePassword = void 0;
const generatePassword = (length = 20) => {
    if (length < 1)
        throw Error('Password length cannot be shorter than 1');
    const chars = `${lower}${upper}${numbers}${punctuation}`;
    let password = '';
    for (let p = 0; p < length; p++) {
        const i = Math.floor(Math.random() * chars.length);
        password += chars[i];
    }
    return password;
};
exports.generatePassword = generatePassword;
const punctuation = '!#$&*+-=?@_';
const numbers = '0123456789';
const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lower = 'abcdefghijklmnopqrstuvwxyz';
//# sourceMappingURL=password.js.map
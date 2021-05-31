"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testPassword = void 0;
const testKeys = [
    'minLength', 'maxLength', 'repeat', 'lowercase', 'uppercase', 'number',
    'symbol'
];
const maxLength = 128;
const minLength = 10;
const minPhraseLength = 20;
const minTestsToPass = 3;
const messages = {
    minLength: `At least ${minLength} characters.`,
    maxLength: `${maxLength} or fewer characters.`,
    repeat: 'No sequences of three or more repeated characters.',
    lowercase: 'At least one lowercase letter.',
    uppercase: 'At least one uppercase letter.',
    number: 'At least one number.',
    symbol: 'At least one symbol.'
};
const fns = {
    minLength: password => password.length >= minLength,
    maxLength: password => password.length <= maxLength,
    repeat: password => !(/(.)\1{2,}/.test(password)),
    lowercase: password => /[a-z]/.test(password),
    uppercase: password => /[A-Z]/.test(password),
    number: password => /[0-9]/.test(password),
    symbol: password => /[^A-Za-z0-9]/.test(password)
};
const compulsory = ['minLength', 'maxLength', 'repeat'];
const optional = testKeys.filter(k => !compulsory.includes(k));
const testPassword = (password) => {
    const results = {
        minLength: true,
        maxLength: true,
        repeat: true,
        lowercase: true,
        uppercase: true,
        number: true,
        symbol: true
    };
    let optionalPassed = 0;
    let isStrong = true;
    compulsory.forEach(key => {
        const isValid = fns[key](password);
        results[key] = isValid;
        isStrong = isStrong && isValid;
    });
    const isPhrase = password.length >= minPhraseLength;
    if (!isPhrase) {
        optional.forEach(key => {
            const isValid = fns[key](password);
            results[key] = isValid;
            if (isValid)
                optionalPassed++;
        });
        isStrong = isStrong && optionalPassed >= minTestsToPass;
    }
    return { isStrong, isPhrase, results, messages, compulsory, optional };
};
exports.testPassword = testPassword;
//# sourceMappingURL=password-strength.js.map
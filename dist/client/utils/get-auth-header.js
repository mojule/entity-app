"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthHeaderValue = void 0;
const getAuthHeaderValue = () => {
    const apiKeyEl = document.querySelector('[data-api-key]');
    if (apiKeyEl === null)
        return;
    const { apiKey } = apiKeyEl.dataset;
    const auth = 'Basic ' + apiKey;
    return auth;
};
exports.getAuthHeaderValue = getAuthHeaderValue;
//# sourceMappingURL=get-auth-header.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSecurityLoginRoutes = void 0;
const bodyParser = require("body-parser");
const delay_handler_1 = require("../../util/delay-handler");
const postHandler = bodyParser.urlencoded({ extended: false });
const createSecurityLoginRoutes = async (passport, options = { loginHandlers: [] }) => {
    const login = {
        method: 'post',
        path: 'login',
        handlers: [
            postHandler,
            delay_handler_1.delayHandler,
            ...options.loginHandlers,
            passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/login' })
        ],
        roles: []
    };
    const logout = {
        method: 'get',
        path: 'logout',
        handlers: [
            async (req, res) => {
                req.logout();
                res.redirect('/');
            }
        ],
        roles: []
    };
    return { login, logout };
};
exports.createSecurityLoginRoutes = createSecurityLoginRoutes;
//# sourceMappingURL=login.js.map
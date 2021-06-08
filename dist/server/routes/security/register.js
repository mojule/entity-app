"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSecurityRegisterRoutes = void 0;
const util_1 = require("@mojule/util");
const express_1 = require("express");
const log_iisnode_1 = require("@mojule/log-iisnode");
const uuid_1 = require("uuid");
const delay_handler_1 = require("../../delay-handler");
const __1 = require("../../..");
const postHandler = express_1.default.urlencoded({ extended: false });
const createSecurityRegisterRoutes = async (db, options) => {
    const { registerHandlers = [], notifyUserVerifyEmail } = options;
    const register = {
        method: 'post',
        path: 'register',
        handlers: [
            // check password strength again
            // generate a secret
            // create a pendingUser
            // send email
            postHandler,
            delay_handler_1.delayHandler,
            ...registerHandlers,
            async (req, res) => {
                const start = Date.now();
                try {
                    if (req.isAuthenticated()) {
                        throw Error('User already logged in while registering');
                    }
                    const { name, email, password } = req.body;
                    const existingUser = await db.collections.user.find({ email });
                    if (existingUser.length) {
                        throw Error(`User with email ${email} already exists`);
                    }
                    const roles = [];
                    const secret = uuid_1.v4();
                    const { isStrong } = __1.testPassword(password);
                    if (!isStrong) {
                        throw Error('Expected strong password');
                    }
                    const userEntity = await __1.createUserEntity({ name, email, roles }, password);
                    const pendingUser = Object.assign(userEntity, { secret });
                    await db.collections.pendingUser.create(pendingUser);
                    await notifyUserVerifyEmail(pendingUser);
                }
                catch (err) {
                    log_iisnode_1.log.error(err);
                }
                const elapsed = Date.now() - start;
                await util_1.delayPromise(250 - elapsed);
                res.redirect('/verify-sent');
            }
        ],
        roles: []
    };
    return { register };
};
exports.createSecurityRegisterRoutes = createSecurityRegisterRoutes;
//# sourceMappingURL=register.js.map
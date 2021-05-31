"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserEntity = void 0;
const bcrypt = require("bcryptjs");
const createUserEntity = async (data, password) => {
    password = await bcrypt.hash(password, 10);
    const { name, email, roles } = data;
    const userEntity = {
        name, email,
        roles: roles,
        password
    };
    return userEntity;
};
exports.createUserEntity = createUserEntity;
//# sourceMappingURL=user.js.map
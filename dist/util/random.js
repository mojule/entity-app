"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pick = exports.randId = exports.randInt = void 0;
const each_1 = require("./each");
const randInt = (exclMax) => Math.floor(Math.random() * exclMax);
exports.randInt = randInt;
const randId = (length = 24) => each_1.createSequence(length, () => exports.randInt(16)).map(v => v.toString(16)).join('');
exports.randId = randId;
const pick = (arr) => arr[exports.randInt(arr.length)];
exports.pick = pick;
//# sourceMappingURL=random.js.map
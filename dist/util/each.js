"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSequence = exports.mapKeyValueMap = exports.mapObjectMap = exports.eachObjectMap = exports.eachKeyValueMap = exports.eachAsync = void 0;
const eachAsync = async (arr, cb) => Promise.all(arr.map(cb)).then(() => { });
exports.eachAsync = eachAsync;
const eachKeyValueMap = (kvs, cb) => Object.keys(kvs).forEach(key => cb(kvs[key], key));
exports.eachKeyValueMap = eachKeyValueMap;
const eachObjectMap = (obj, cb) => Object.keys(obj).forEach(key => cb(obj[key], key));
exports.eachObjectMap = eachObjectMap;
const mapObjectMap = (obj, cb) => Object.keys(obj).map(key => cb(obj[key], key));
exports.mapObjectMap = mapObjectMap;
const mapKeyValueMap = (kvs, cb) => Object.keys(kvs).map(key => cb(kvs[key], key));
exports.mapKeyValueMap = mapKeyValueMap;
const createSequence = (length, cb) => Array.from({ length }, (_v, k) => cb(k));
exports.createSequence = createSequence;
//# sourceMappingURL=each.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveRefsDeep = exports.resolveRefsShallow = exports.resolveRefArray = exports.resolveRef = exports.isRefArray = exports.isRef = void 0;
const isRef = (ref) => {
    if (!ref)
        return false;
    if (typeof ref._id !== 'string')
        return false;
    if (typeof ref._collection !== 'string')
        return false;
    return true;
};
exports.isRef = isRef;
const isRefArray = (arg) => {
    if (!Array.isArray(arg))
        return false;
    if (!arg.every(exports.isRef))
        return false;
    return true;
};
exports.isRefArray = isRefArray;
const resolveRef = async (db, ref) => {
    const { _collection, _id } = ref;
    const collection = db.collections[_collection];
    const dbEntity = await collection.load(_id);
    return dbEntity;
};
exports.resolveRef = resolveRef;
const resolveRefArray = async (db, refs) => {
    if (refs.length === 0)
        return [];
    const [first] = refs;
    const { _collection } = first;
    const ids = refs.map(ref => ref._id);
    const dbEntitys = await db.collections[_collection].loadMany(ids);
    return dbEntitys;
};
exports.resolveRefArray = resolveRefArray;
const resolveRefsShallow = async (db, obj) => {
    const result = {};
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = obj[key];
        if (exports.isRef(value)) {
            const resolved = await exports.resolveRef(db, value);
            result[key] = resolved;
        }
        else if (exports.isRefArray(value)) {
            result[key] = await exports.resolveRefArray(db, value);
        }
        else {
            result[key] = value;
        }
    }
    return result;
};
exports.resolveRefsShallow = resolveRefsShallow;
const resolveRefsDeep = async (db, obj, depthLimit = 20) => {
    const resolve = async (obj, depth = 0) => {
        if (depth > depthLimit)
            throw Error('Exceeded depth limit');
        const result = {};
        const keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
            const value = obj[keys[i]];
            if (exports.isRef(value)) {
                let entity = await exports.resolveRef(db, value);
                result[keys[i]] = await resolve(entity, depth + 1);
            }
            else if (exports.isRefArray(value)) {
                let entities = await exports.resolveRefArray(db, value);
                result[keys[i]] = await Promise.all(entities.map(e => resolve(e, depth + 1)));
            }
            else {
                result[keys[i]] = value;
            }
        }
        return result;
    };
    return resolve(obj);
};
exports.resolveRefsDeep = resolveRefsDeep;
//# sourceMappingURL=ref.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalCollections = exports.secureDbFactory = void 0;
const account_manage_1 = require("./account-manage");
const create_collection_1 = require("../unique/create-collection");
const access_1 = require("./access");
const create_collection_2 = require("./create-collection");
const errors_1 = require("./errors");
const group_1 = require("./group");
const user_1 = require("./user");
const initCollections = async (db, user) => {
    const secureCollections = {};
    for (const key in db.collections) {
        let collection = await create_collection_2.createSecureCollection(db, key, user);
        if (key === 'user' || key === 'group' || key === 'collectionData') {
            collection = create_collection_1.createUniqueFieldsCollection(collection, key, ['name']);
        }
        secureCollections[key] = collection;
    }
    return secureCollections;
};
/*
  creates a secure db

  returns a login function that returns a db where the logged in user can only
  do what they have permission for
*/
const secureDbFactory = async (db, rootUser) => {
    const existingUser = await db.collections.user.findOne({ name: rootUser.name });
    if (existingUser === undefined) {
        await initRootUser(db, rootUser);
    }
    else {
        if (!existingUser.isRoot)
            throw Error(`User ${existingUser.name} exists but is not root`);
        const isValid = await user_1.validateDbUser(db.collections.user, rootUser);
        if (!isValid)
            throw errors_1.createEperm('secureDbFactory');
    }
    const login = async (user) => {
        const isValid = await user_1.validateDbUser(db.collections.user, user);
        if (!isValid) {
            throw errors_1.createEperm('login');
        }
        // we can bang assert because isValid would have thrown
        const dbUser = (await db.collections.user.findOne({ name: user.name }));
        const internalCollections = await initCollections(db, dbUser);
        const drop = async () => {
            if (!dbUser.isRoot)
                throw errors_1.createEperm('drop');
            return db.drop();
        };
        const close = async () => {
            if (!dbUser.isRoot)
                throw errors_1.createEperm('close');
            return db.close();
        };
        const deleteExternal = {
            user: undefined,
            group: undefined,
            collectionData: undefined,
            pendingUser: undefined,
            userSecret: undefined
        };
        const collections = Object.assign({}, internalCollections, deleteExternal);
        const userFns = user_1.createUserFns(internalCollections.user, dbUser);
        const groupFns = group_1.createGroupFns(internalCollections, dbUser);
        const accessFns = access_1.createAccessFns(db.collections, groupFns.isUserInGroup, dbUser);
        const accountFns = account_manage_1.accountManageFactory(db);
        const secureDb = Object.assign(Object.assign(Object.assign(Object.assign({ drop, close, collections }, accessFns), userFns), groupFns), { account: accountFns });
        secureDb[exports.InternalCollections] = internalCollections;
        return Object.assign({}, db, secureDb);
    };
    return login;
};
exports.secureDbFactory = secureDbFactory;
exports.InternalCollections = Symbol('Internal Collections');
const initGroups = async (db, userRef) => {
    const createGroup = async (name, users) => {
        const group = { name, users };
        const groupId = await db.collections.group.create(group);
        const groupRef = { _id: groupId, _collection: 'group' };
        const dbGroup = await db.collections.group.load(groupId);
        dbGroup._owner = userRef;
        dbGroup._group = groupRef;
        await db.collections.group.save(dbGroup);
        return groupRef;
    };
    const rootGroupRef = await createGroup('root', [userRef]);
    const usersRef = await createGroup('users', [userRef]);
    const nobodyRef = await createGroup('nobody', []);
    return { rootGroupRef, usersRef, nobodyRef };
};
const initRootUser = async (db, rootUser) => {
    const user = await user_1.hashPassword(rootUser);
    user.isRoot = true;
    const userId = await db.collections.user.create(user);
    const userRef = {
        _id: userId, _collection: 'user'
    };
    const { rootGroupRef } = await initGroups(db, userRef);
    const dbUser = await db.collections.user.load(userId);
    dbUser._owner = userRef;
    dbUser._group = rootGroupRef;
    const saveUser = {
        _id: dbUser._id
    };
    Object.keys(dbUser).forEach(key => {
        if (key === 'password')
            return;
        saveUser[key] = dbUser[key];
    });
    await db.collections.user.save(saveUser);
    // create collectionData, owned by root
    for (const key in db.collections) {
        await initCollectionData(db.collections.collectionData, key, userRef, rootGroupRef);
    }
};
const initCollectionData = async (collection, key, userRef, groupRef) => {
    const _id = await collection.create({ name: key, _owner: userRef, _group: groupRef });
    const collectionData = await collection.load(_id);
    return collectionData;
};
//# sourceMappingURL=index.js.map
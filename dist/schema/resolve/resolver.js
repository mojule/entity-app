"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaResolver = void 0;
const ref_1 = require("../ref");
const ref_resolver_1 = require("./ref-resolver");
const db_ref_resolver_1 = require("./db-ref-resolver");
const createRef = ref_1.refFactory('#');
const schemaResolver = async (db, entityKey, entitySchemas, commonSchemas = {}) => {
    const refSchemas = ref_1.createRefSchemaMap(entitySchemas, createRef);
    const allSchema = Object.assign({}, commonSchemas, refSchemas, entitySchemas);
    const refResolvedSchema = ref_resolver_1.refResolver(allSchema, entityKey);
    const dbResolvedSchema = await db_ref_resolver_1.dbRefResolver(entityKey, refResolvedSchema, db);
    return dbResolvedSchema;
};
exports.schemaResolver = schemaResolver;
//# sourceMappingURL=resolver.js.map
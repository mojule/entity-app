/// <reference types="qs" />
import { EntitySchemaMap } from '../../schema/types';
import { SchemaRoute, ActionType } from './types';
import { EntitySchemaDb } from '../../db/types';
import { RequestHandler } from 'express';
export declare const createSchemaRoutes: <TEntityMap>(schemaMap: import("../../util/types").KeyValueMap<TEntityMap, import("../../schema/types").IdSchema>) => SchemaRoute<TEntityMap>[];
export declare const createEntitySchemaRouteHandler: <TEntityMap>(store: EntitySchemaDb<TEntityMap>, collectionKey: keyof TEntityMap, type: ActionType) => RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
